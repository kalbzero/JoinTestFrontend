'use client'
import { useEffect, useState } from "react";
import Link from "next/link";

type CategoriaProduto = {
  id_categoria_produto: number;
  nome_categoria: string;
};

export default function CategoriaPage() {
  const [categorias, setCategorias] = useState<CategoriaProduto[]>([]);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await fetch("http://localhost:8000/api/categorias");
      const data = await response.json();
      setCategorias(data);
    };

    fetchCategorias();
  }, []);

  const deleteCategoria = async (id: number) => {
    const response = await fetch(`http://localhost:8000/api/categorias/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setCategorias(categorias.filter((categoria) => categoria.id_categoria_produto !== id));
      setDeleting(null);
    } else {
      alert("Erro ao excluir categoria");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Voltar
        </Link>
        <div className="text-right flex justify-between items-center w-full">
          <h1 className="text-2xl font-semibold ml-4">Lista de Categorias</h1>
          <Link
            href="/categorias/form"
            className="ml-4 px-6 py-3 bg-green-500 text-white text-lg rounded-lg shadow-md hover:bg-green-600"
          >
            Criar Categoria
          </Link>
        </div>
      </div>

      {/* Tabela de Categorias */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="px-6 py-3 text-left">Nome da Categoria</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length > 0 ? (
            categorias.map((categoria) => (
              <tr key={categoria.id_categoria_produto} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{categoria.nome_categoria}</td>
                <td className="px-6 py-4 text-right">
                  {/* Botões de Ação */}
                  <Link
                    href={`/categorias/form/${categoria.id_categoria_produto}`}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => setDeleting(categoria.id_categoria_produto)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center px-6 py-4">
                Nenhuma categoria encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de Confirmação */}
      {deleting !== null && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              Tem certeza que deseja excluir esta categoria?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => setDeleting(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md mr-2 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={() => deleteCategoria(deleting)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
