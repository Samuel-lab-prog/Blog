import SignupForm from '../components/forms/SignupForm';
import Button from '../components/Button';

export default function SignupPage() {
  return (
    <main className="absolute w-full top-20 flex flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center p-4">
        <h2 className="">Criar Conta</h2>
        <p className="w-4/5 md:w-fit text-center">
          Preencha os detalhes abaixo para criar uma conta.
        </p>
        <SignupForm />
        <Button variant="anchor" to="/login">
          Já tem uma conta? Faça login
        </Button>
      </section>
    </main>
  );
}
