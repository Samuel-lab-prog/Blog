import SigninForm from '../components/SigninForm';
import Button from '../components/Button';
export default function SigninPage() {
  return (
    <main className="absolute w-full top-20 h-fit py-12 flex flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center">
        <h2 className="mb-1">Login</h2>
        <p className="w-3/5 md:w-fit text-center">
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
