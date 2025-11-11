import SigninForm from '../components/LoginForm';
import Button from '../components/Button';

export default function SigninPage() {
  return (
    <main className="absolute w-full h-screen flex flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center p-4">
        <h2 className="">Login</h2>
        <p className="w-4/5 md:w-fit text-center">
          Preencha os detalhes abaixo para entrar na sua conta.
        </p>
        <SigninForm />
        <Button variant="anchor" to="/signup">
          Não tem uma conta? Crie uma conta
        </Button>
      </section>
    </main>
  );
}
