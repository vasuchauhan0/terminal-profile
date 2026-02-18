export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">

      {/* Eyes Container */}
      <div className="relative eye-head">
        <div className="eye eye-left"></div>
        <div className="eye eye-right"></div>
      </div>

      {/* Text */}
      <div className="mt-24 text-center">
        <div className="text-7xl font-extrabold mb-2">404</div>
        <div className="typing-text text-2xl">
          Got lost? How.....? why.....? Ahhhh....
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .eye-head {
          width: 200px;
          display: flex;
          justify-content: space-between;
          animation: shvr 0.2s infinite;
          position: relative;
        }

        .eye {
          width: 75px;
          height: 80px;
          background: white;
          border-radius: 50% 50% 50% 50% / 45px 45px 45% 45%;
          position: relative;
          transform: rotate(45deg);
        }

        .eye-right {
          transform: rotate(-45deg);
        }

        .eye::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: black;
          border-radius: 50%;
          top: 30px;
          left: 25px;
          animation: eye-move 2.5s infinite;
        }

        .eye::before {
          content: '';
          position: absolute;
          width: 70px;
          height: 50px;
          border-bottom: 2px solid white;
          bottom: -10px;
          left: 0;
          border-radius: 50%;
        }

        .typing-text {
          width: 140px;
          white-space: nowrap;
          overflow: hidden;
          animation: text-show 2s infinite steps(3);
        }

        @keyframes eye-move {
          0%, 30%, 55%, 90%, 100% {
            transform: translate(0, 0);
          }
          10%, 25% {
            transform: translate(0, 20px);
          }
          65% {
            transform: translate(-20px, 0);
          }
          80% {
            transform: translate(20px, 0);
          }
        }

        @keyframes shvr {
          0% {
            transform: translateX(1px);
          }
          50% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1px);
          }
        }

        @keyframes text-show {
          to {
            text-indent: -360px;
          }
        }
      `}</style>
    </div>
  );
}
