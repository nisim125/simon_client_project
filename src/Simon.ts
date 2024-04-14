export class Simon {
    private simonSequence: string[] = [];

    public constructor() {
        this.simonSequence;
    }

    public RestartSimon(){
        this.simonSequence.length = 0;
    }

    public GetSimonSequence(): string[] {
        return this.simonSequence;
    }

    public SetSimonSequence(color: string): void {
        this.simonSequence.push(color);
    }
}