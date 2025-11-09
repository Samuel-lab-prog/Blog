import { useState } from 'react';
import PostSubmitForm from '../components/PostSubmitForm';
import PostDeleteForm from '../components/PostDeleteForm';
import PostUpdateForm from '../components/PostUpdateForm';

import Button from '../components/Button';

export default function AdminPage() {
  const [selectedAction, setSelectedAction] = useState<
    'submit' | 'delete' | 'update'
  >('submit');

  const actionMap = {
    submit: <PostSubmitForm />,
    delete: <PostDeleteForm />,
    update: <PostUpdateForm />,
  };

  return (
    <main className="absolute px-4 w-full left-0 top-20 flex flex-col items-center">
      <section className="flex-col w-full max-w-xl">
        <h2 className="text-gray-900 text-center mt-8">
          {selectedAction === 'submit' && 'Create a New Post'}
          {selectedAction === 'delete' && 'Delete a Post'}
          {selectedAction === 'update' && 'Update a Post'}
        </h2>
        <div className="flex w-full justify-center max-w-xl mt-8 gap-x-2 px-4">
          <Button onClick={() => setSelectedAction('submit')}>
            Submit
          </Button>
          <Button onClick={() => setSelectedAction('delete')}>
            Delete
          </Button>
          <Button onClick={() => setSelectedAction('update')}>
            Update
          </Button>
        </div>

        {actionMap[selectedAction]}
      </section>
    </main>
  );
}
