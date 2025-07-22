import {FaInstagram,FaEnvelope,FaLinkedin,} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content mt-auto">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="footer-title">BusTrack</h3>
          <p>Real-time bus tracking <br/>made simple</p>
        </div>
        <div>
          <h3 className="footer-title">Services</h3>
          <a className="link link-hover">Live Tracking</a><br/>
          <a className="link link-hover">Schedule</a><br/>
          <a className="link link-hover">Fare Calculator</a>
        </div>
        <div>
          <h3 className="footer-title">Company</h3>
          <a className="link link-hover">About us</a><br/>
          <a className="link link-hover">Careers</a><br/>
          <a className="link link-hover">Privacy policy</a>
        </div>

        <div>
      <h3 className="footer-title">Connect</h3>
      <div className="grid grid-flow-col gap-4">


        <div className="dropdown dropdown-top">
          <label tabIndex={0} className="btn btn-ghost btn-circle text-xl">
            <FaLinkedin />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a href="https://www.linkedin.com/in/shrejan-kotyan-b15b19295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                Shrejan
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/likhith-rao-47791b2a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                Likhith
              </a>
            </li>
          </ul>
        </div>


        <div className="dropdown dropdown-top">
          <label tabIndex={0} className="btn btn-ghost btn-circle text-xl">
            <FaInstagram />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a href="https://www.instagram.com/shrejan_kotyan?igsh=NDN4bXNmM2g4ZjFx" target="_blank" rel="noopener noreferrer">
                Shrejan
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/likhith__bahumaan?igsh=MWlrbHNoZzFpempsbQ==" target="_blank" rel="noopener noreferrer">
                Likhith
              </a>
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-top">
          <label tabIndex={0} className="btn btn-ghost btn-circle text-xl">
            <FaEnvelope />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="mailto:shrejankotyan@gmail.com">Shrejan</a></li>
            <li><a href="mailto:likhithraok2031@gmail.com">Likhith</a></li>
          </ul>
        </div>

      </div>
    </div>

      </div>
      <div className="container mx-auto flex items-center justify-center pt-8 text-center">
        <p>© {new Date().getFullYear()} TrackMyBus. All rights reserved.</p>
      </div>
    </footer>
  );
}
