import styles from './LoginPage.module.scss';
import { ReactComponent as AppleIcon } from '../../assets/icons/apple_icon.svg';
import { ReactComponent as GoogleIcon } from '../../assets/icons/google_icon.svg';
import { signInWithGoogle } from '../../config/firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        localStorage.setItem('listed-name', result.user.displayName);
        localStorage.setItem('listed-email', result.user.email);
        localStorage.setItem('listed-profilePic', result.user.photoURL);
        navigate('/');
        toast.success('Successfully loggedIn!');
      })
      .catch((err) => {
        toast.error('Something went wrong, Please try again');
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>Oris.</div>
      <div className={styles.right}>
        <div className={styles.rightContainer}>
          <h1>Sign In</h1>
          <p>Sign in to your account</p>

          <div className={styles.signInButtons}>
            <div className={styles.signInButton} onClick={handleLogin}>
              <GoogleIcon /> Sign in with Google
            </div>
            <div className={styles.signInButton}>
              <AppleIcon /> Sign in with Apple
            </div>
          </div>

          <div className={styles.signInContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor='email'>Email address</label>
              <input id='email' />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor='pass'>Password</label>
              <input id='pass' type='password' />
            </div>

            <p className={styles.forgot}>Forgot password?</p>
            <button className={styles.signInButton} onClick={handleLogin}>
              Sign In
            </button>
          </div>
          <p className={styles.registerText}>
            Don’t have an account? <span>Register here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
