import Button from '../components/Button';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center gap-y-4">
      <h1 className="text-gray-800">404</h1>
      <p className="text-gray-800">Página não encontrada</p>
      <Button to="/">Voltar à página inicial</Button>
    </div>
  );
}
