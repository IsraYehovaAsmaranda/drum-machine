import PropTypes from "prop-types";
import { Component } from "react";
import audios from "../data/audio";

class DrumMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playedAudio: "",
    };
    this.handleBankToggle = this.handleBankToggle.bind(this);
    this.handleAudioPlay = this.handleAudioPlay.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    // Tambahkan event listener untuk menangani keydown
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    // Hapus event listener saat komponen di-unmount
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleBankToggle() {
    this.props.toggleBank();
  }

  handleAudioPlay(id, name) {
    this.setState({
        playedAudio: name
    });
    const audioToPlay = document.getElementById(id);
    if (audioToPlay) {
      audioToPlay.currentTime = 0; // Set waktu ke awal jika audio sudah diputar
      audioToPlay.play();
    }
  }

  handleKeyPress(event) {
    // Periksa apakah tombol yang ditekan ada di dalam data audio
    const audio = audios.find((a) => a.hotkey === event.key.toUpperCase());
    if (audio) {
      this.handleAudioPlay(audio.hotkey, audio.name);
    }
  }
  render() {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-500">
        <div
          id="drum-machine"
          className="container bg-gray-300 w-full lg:w-1/2 rounded-lg shadow-md p-6 border border-solid border-yellow-500"
        >
          <div className="flex flex-wrap space-y-10">
            <div className="w-full justify-items-center md:w-1/2 grid grid-cols-3 space-y-3 cursor-pointer">
              {audios.map((audio, index) => (
                <div
                  key={index}
                  className="mt-3 drum-pad bg-gray-500 rounded-lg px-8 py-5 shadow-2xl active:bg-yellow-400"
                  onClick={() => this.handleAudioPlay(audio.hotkey, audio.name)}
                  id={audio.key}
                >
                  <audio className="clip" id={audio.hotkey} src={audio.src}></audio>
                  {audio.hotkey}
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/2 flex flex-col space-y-2">
              <div className="flex flex-col items-center">
                <p className="text-lg font-bold">Power</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>
              <div className="bg-gray-500 text-center p-4">
                <p className="text-xl font-bold" id="display">
                  {this.state.playedAudio}
                </p>
              </div>
              <div>
                <input
                  className="w-full"
                  type="range"
                  max="1"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="mt-2 text-lg font-bold">Bank</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={this.handleBankToggle}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DrumMachine.propTypes = {
  toggleBank: PropTypes.func,
  bank: PropTypes.bool,
};

export default DrumMachine;
