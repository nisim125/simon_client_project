export class Player {
    private playerSequence: string[] = [];
    private name: string;

    public constructor(name: string) {
        this.playerSequence;
        this.name = name;
    }

    public RestartPlayer(name: string) {
        this.playerSequence.length = 0;
        this.name = name;
    }

    public GetPlayerSequence(): string[] {
        return this.playerSequence;
    }

    public GetName(): string {
        return this.name;
    }

    public SetPlayerSequence(color: string): void {
        this.playerSequence.push(color);
    }

    public ResetPlayerSequence(): void {
        this.playerSequence.length = 0;
    }

    public SetName(name: string): void {
        this.name = name;
    }
}