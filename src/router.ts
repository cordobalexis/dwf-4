const routes = [
    {
        path: /^\/$/,
        component: (props: any) => {
           const el = document.createElement("welcome-page") as any;
           el.goTo = props.goTo;
           return el;
        }
    },

    {
        path: /\/instruction/,
        component: (props: any) => {
           const el = document.createElement("instructions-page") as any;
           el.goTo = props.goTo;
           return el;
        }
    },

    {
        path: /\/game/,
        component: (props: any) => {
           const el = document.createElement("game-page")as any;
           el.goTo = props.goTo;
           return el;
        }

    },

    {
        path: /\/result/,
        component: (props: any) => {
           const el = document.createElement("result-page") as any;
           el.goTo = props.goTo;
           return el;
        }
    }
]
export function initRouter (container: Element){
    function goTo(path: string){
        history.pushState({}, "", path);
        handleRoute(path);
    }

    function handleRoute(route: string){
        for(const r of routes){
            if(r.path.test(route)){
                const el = r.component({goTo});
                if(container.firstChild){
                    container.firstChild.remove();
                }
                container.appendChild(el);
            }
        }
    }
    handleRoute(location.pathname);
    window.onpopstate = () =>{
        handleRoute(location.pathname);
    };
    return {
        goTo
    };
}