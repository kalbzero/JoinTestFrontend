"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

type Categoria = {
  id_categoria_produto: number;
  nome_categoria: string;
};

export default function CategoriaForm() {
  const [categoria, setCategoria] = useState<Categoria>({ id_categoria_produto: 0, nome_categoria: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit && id) {
      const fetchCategoria = async () => {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/api/categorias/${id}`);
        const data = await response.json();
        setCategoria(data);
        setIsLoading(false);
      };

      fetchCategoria();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://localhost:8000/api/categorias/${categoria.id_categoria_produto}`
      : "http://localhost:8000/api/categorias";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    });

    if (response.ok) {
      router.push("/categorias");
    } else {
      alert("Erro ao salvar categoria");
    }

    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{isEdit ? "Editar Categoria" : "Criar Categoria"}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-100">
          <label htmlFor="nome_categoria" className="block text-sm font-medium text-gray-700">
            Nome da Categoria
          </label>
          <input
            type="text"
            id="nome_categoria"
            name="nome_categoria"
            value={categoria.nome_categoria}
            onChange={(e) => setCategoria({ ...categoria, nome_categoria: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/categorias")}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : isEdit ? "Atualizar Categoria" : "Criar Categoria"}
          </button>
        </div>
      </form>
    </div>
  );
}