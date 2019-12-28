export class AudioAPI {
    private context: AudioContext;
    private analyser: AnalyserNode;
    private connectedNode: MediaStreamAudioSourceNode | null = null;
    private analyserData: Float32Array;

    constructor() {
        this.context = new (window.AudioContext ||
            (window as any).webkitAudioContext)();

        this.analyser = this.context.createAnalyser();
        this.analyserData = new Float32Array(this.analyser.frequencyBinCount);

        this.requestPermissions();
    }

    public getAudioData = () => {
        this.analyser.getFloatFrequencyData(this.analyserData);
        return this.analyserData;
    };

    private connect = (connectedNode: MediaStreamAudioSourceNode) => {
        this.connectedNode = connectedNode;
        this.connectedNode.connect(this.analyser);
    };

    public releaseConnection = () => {
        if (this.connectedNode) {
            this.connectedNode.disconnect(this.analyser);
        }
    };

    private requestPermissions = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(
                {
                    audio: true,
                    video: false
                }
            ).then(stream => {
                const audioSource = this.context.createMediaStreamSource(stream);
                this.connect(audioSource);
            }).catch(console.log);
        }
    };
}
