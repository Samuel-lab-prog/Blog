import SigninForm from '../components/SignupForm';
import Button from '../components/Button';
export default function SignupPage() {
  return (
    <main className="absolute w-full h-full flex flex-col items-center justify-center">
      <h2 className="">Create Account</h2>
      <p className="w-3/5 md:w-fit text-center">
        Please fill in the details below to create an account.
      </p>
      <SigninForm />
      <Button variant="anchor" to="/signin">
        Already has an account? Sign in
      </Button>
    </main>
  );
}
