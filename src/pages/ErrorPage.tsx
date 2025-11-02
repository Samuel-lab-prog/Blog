import Button from '../components/Button';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-gray-800">Página não encontrada</p>
      <Button to="/" variant="primary" className="mt-6">
        Voltar à página inicial
      </Button>
    </div>
  );
}
