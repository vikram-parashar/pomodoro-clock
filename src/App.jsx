import { useState, useEffect } from "react";

export default function App() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pomodoro, setPomodoro] = useState(25*60);
  const [breakTime, setBreakTime] = useState(10*60);
  const minutes = Math.floor(pomodoro / 60);
  const seconds = pomodoro % 60;

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setPomodoro((prevState) => prevState - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);
  useEffect(() => {
    if (pomodoro === 0) {
      setIsPlaying(false);
      setPomodoro(breakTime + 1);
      alert("Time's up! Click OK to start a (new) break.");
    }
  }, [pomodoro, breakTime]);

  function playPauseHandler() {
    setSessionStarted(true);
    setIsPlaying((prevState) => !prevState);
    console.log("playPauseHandler");
  }
  function resetHandler() {
    setSessionStarted(false);
    setIsPlaying(false);
    setPomodoro(1500);
    setBreakTime(300);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto flex h-[720px] w-full max-w-3xl flex-col items-center">
        <h1 className="my-10 text-center text-3xl text-white pt-5">
          Pomodoro Timer
        </h1>
        <div className="relative rounded-full border-slate-200 border-8 mb-10 flex h-[250px] w-[250px] md:h-[360px] md:w-[360px] items-center justify-center">
          <div className="relative z-10">
            <p className="text-7xl font-extrabold">
              {minutes / 10 < 1 ? `0${minutes}` : minutes}:
              {seconds / 10 < 1 ? `0${seconds}` : seconds}
            </p>
            <button
              onClick={playPauseHandler}
              className="mt-2 w-full text-center text-2xl"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>
        {sessionStarted ? (
          <button
            className="mb-5 border-2 border-white px-10 py-2 font-bold"
            onClick={resetHandler}
          >
            Reset
          </button>
        ) : (
          <div className="w-full px-6">
            <div className="mb-5 flex w-full justify-between">
              <span className="md:mr-10 text-xl md:text-2xl">Set Timer: </span>
              <div>
                <button
                  onClick={() => {
                    if (pomodoro === 60) return;
                    setPomodoro((prev) => prev - 60);
                  }}
                  className="bg-[#11ac98] px-3 py-1 text-xl"
                >
                  -
                </button>
                <span className="inline-block w-10 text-center font-bold">
                  {pomodoro / 60}
                </span>
                <button
                  className="bg-[#11ac98] px-3 py-1 text-xl"
                  onClick={() => setPomodoro((prev) => prev + 60)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="mb-5 flex w-full justify-between">
              <span className="md:mr-10 text-xl md:text-2xl">Set Break Time: </span>
              <div>
                <button
                  onClick={() => {
                    if (breakTime === 60) return;
                    setBreakTime((prev) => prev - 60);
                  }}
                  className="bg-[#11ac98] px-3 py-1 text-xl"
                >
                  -
                </button>
                <span className="inline-block w-10 text-center font-bold">
                  {breakTime / 60}
                </span>
                <button
                  className="bg-[#11ac98] px-3 py-1 text-xl"
                  onClick={() => setBreakTime((prev) => prev + 60)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
        <span className="absolute bottom-3 mb-5">
          Created by: @Vikram_Parahshar
        </span>
      </div>
    </div>
  );
}
