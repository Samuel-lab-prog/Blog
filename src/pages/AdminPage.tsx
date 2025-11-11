import { useState } from 'react';
import PostSubmitForm from '../components/PostSubmitForm';
import PostDeleteForm from '../components/PostDeleteForm';
import PostUpdateForm from '../components/PostUpdateForm';
import Button from '../components/Button';

export default function AdminPage() {
  const [selectedAction, setSelectedAction] = useState<
    'criar' | 'deletar' | 'atualizar'
  >('criar');
  const actionMap = {
    criar: <PostSubmitForm />,
    deletar: <PostDeleteForm />,
    atualizar: <PostUpdateForm />,
  };

  return (
    <main className="absolute px-4 w-full left-0 top-20 flex flex-col items-center">
      <section className="flex-col w-full max-w-xl">
        <h2 className="text-gray-900 text-center mt-8">
          {selectedAction === 'criar' && 'Criar post'}
          {selectedAction === 'deletar' && 'Deletar post'}
          {selectedAction === 'atualizar' && 'Atualizar post'}
        </h2>
        <div className="flex w-full justify-center max-w-xl mt-8 gap-x-2 px-4">
          <Button onClick={() => setSelectedAction('criar')}>
            Criar
          </Button>
          <Button onClick={() => setSelectedAction('deletar')}>
            Deletar
          </Button>
          <Button onClick={() => setSelectedAction('atualizar')}>
            Atualizar
          </Button>
        </div>
        {actionMap[selectedAction]}
      </section>
    </main>
  );
}
