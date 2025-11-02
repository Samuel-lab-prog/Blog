import SigninForm from '../components/SigninForm';
import Button from '../components/Button';
export default function SigninPage() {
  return (
    <main className="absolute w-full h-full flex flex-col items-center justify-center">
      <h2 className="">Log-in</h2>
      <p className="w-3/5 md:w-fit text-center">
        Please fill in the details below to enter into your account.
      </p>
      <SigninForm />
      <Button variant="anchor" to="/signup">
        Don't have an account? Sign up
      </Button>
    </main>
  );
}
