export type Jugada = "piedra" | "papel" | "tijera";
type Result = "win" | "lose" | "draw";
type Game = {
    computerPlay: Jugada | null,
    myPlay: Jugada | null,
};
export const state = {
    data:{
        currentGame:{
            computerPlay: null,
            myPlay: null
        }as Game,
        history:[] as Game[]
    },
    listeners: [] as Array<(state: any) => void>,

    getState(){
        return this.data;
    },
    setState(newState:any){
        this.data = newState;
        for(const cb of this.listeners){
            cb(this.data);
        }
    },
    subscribe(callback: (state: any) => void){
        const onChange = () => {
            callback(this.data);
        };
        this.listeners.push(onChange);
    },
    setMove(move:Jugada){
        const currentState = this.getState();
        currentState.currentGame.myPlay = move;
        this.setState(currentState);
    },
    setComputerMove(move: Jugada){
        const currentState = this.getState();
        currentState.currentGame.computerPlay = move;
        this.setState(currentState);
    },
    pushToHistory(play:Game){
        const currentState = this.getState();
        currentState.history.push(play);
        this.setState(currentState);
    },
    getScore(){
        let playerScore: number = 0;
        let computerScore: number = 0;
        for(const game of this.data.history){
            if(game.myPlay && game.computerPlay){
            const result = this.whoWins(game.myPlay, game.computerPlay);
            if(result === "win"){
                playerScore++;
            }
            if(result === "lose"){
                computerScore++;
            }
        }
    }
    return {
            playerScore,
            computerScore
        };
    },

    getResult(){
        const score = this.getScore();
        if(score.playerScore > score.computerScore){
            return "win";
        }
        return "lose";
    },

    whoWins(myPlay: Jugada,computerPlay: Jugada): Result{
        const ganeConTijera = myPlay == "tijera" && computerPlay == "papel";
        const ganeConPiedra = myPlay == "piedra" && computerPlay == "tijera";
        const ganeConPapel = myPlay == "papel" && computerPlay == "piedra";
        const gane = [ganeConPapel, ganeConPiedra, ganeConTijera].includes(true)

        if(myPlay === computerPlay){
            return "draw"
        } 
        if(gane){
            return "win"
        }
        return "lose"
    }
}