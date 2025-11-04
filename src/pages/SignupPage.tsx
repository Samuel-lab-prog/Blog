import SignupForm from '../components/SignupForm';
import Button from '../components/Button';
export default function SignupPage() {
  return (
    <main className="absolute w-full py-6 top-20 h-fit flex flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center">
        <h2 className="mb-1">Criar Conta</h2>
        <p className="w-3/5 md:w-fit text-center">
          Preencha os detalhes abaixo para criar uma conta.
        </p>
        <SignupForm />
        <Button variant="anchor" to="/signin">
          Já tem uma conta? Faça login
        </Button>
      </section>
    </main>
  );
}
