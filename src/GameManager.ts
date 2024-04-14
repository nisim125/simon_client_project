import { Player } from "./Player";
import { Simon } from "./Simon";

export class GameManager {
    private player: Player;
    private simon: Simon;
    private isGameRunning: boolean = false;
    private isPlayerMoveAllowd: boolean = false;
    private colors: string[] = ["red", "green", "blue", "yellow"]

    public constructor(name: string) {
        this.player = new Player(name);
        this.simon = new Simon;
        this.isGameRunning;
        this.isPlayerMoveAllowd;
        this.colors;
    }

    public RestartGame(name: string) {
        this.player.RestartPlayer(name);
        this.simon.RestartSimon();
        console.log("player name: " + name);
    }

    public CompareSequences(index: number): boolean {
        const simonSequence: string[] = this.simon.GetSimonSequence();
        const playerSequence: string[] = this.player.GetPlayerSequence();
        for (let i = 0; i < index; i++)
            if (simonSequence[i] != playerSequence[i])
                return false;
        return true;
    }

    public AddSimonNewColor(): void {
        this.simon.SetSimonSequence(this.colors[Math.floor(Math.random() * 4)]);
    }

    public GetPlayer(): Player {
        return this.player;
    }

    public GetSimon(): Simon {
        return this.simon;
    }

    public GetIsGameRunning(): boolean {
        return this.isGameRunning;
    }

    public SetIsGameRunning(isRunning: boolean): void {
        this.isGameRunning = isRunning;
    }

    public GetIsPlayerMoveAllowd(): boolean {
        return this.isPlayerMoveAllowd;
    }
}