"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

type Produto = {
  id_produto?: number; // id_produto é opcional na criação
  nome_produto: string;
  valor_produto: number;
  id_categoria_produto: number;
};

export default function ProdutoForm() {
  const [produto, setProduto] = useState<Produto>({
    nome_produto: "",
    valor_produto: 0,
    id_categoria_produto: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categorias, setCategorias] = useState<
    { id_categoria_produto: number; nome_categoria: string }[]
  >([]);
  const router = useRouter();
  const { id } = useParams(); // Usando useParams() para obter o id da URL

  const isEdit = Boolean(id); // Verifica se há um ID na URL

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await fetch("http://localhost:8000/api/categorias");
      const data = await response.json();
      setCategorias(data);
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (isEdit && id) {
      const fetchProduto = async () => {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/api/produtos/${id}`);
        const data = await response.json();
        setProduto(data);
        setIsLoading(false);
      };

      fetchProduto();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const method = isEdit ? "PUT" : "POST"; // Se for edição, usa PUT, senão POST
    const url = isEdit
      ? `http://localhost:8000/api/produtos/${produto.id_produto}`
      : "http://localhost:8000/api/produtos";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });

    if (response.ok) {
      router.push("/produtos"); // Redireciona para a página de produtos após salvar
    } else {
      alert("Erro ao salvar produto");
    }

    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        {isEdit ? "Editar Produto" : "Criar Produto"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-100">
          <label
            htmlFor="nome_produto"
            className="block text-sm font-medium text-gray-700"
          >
            Nome do Produto
          </label>
          <input
            type="text"
            id="nome_produto"
            name="nome_produto"
            value={produto.nome_produto}
            onChange={(e) =>
              setProduto({ ...produto, nome_produto: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="w-100">
          <label
            htmlFor="valor_produto"
            className="block text-sm font-medium text-gray-700"
          >
            Valor do Produto
          </label>
          <input
            type="number"
            id="valor_produto"
            name="valor_produto"
            value={produto.valor_produto}
            onChange={(e) =>
              setProduto({
                ...produto,
                valor_produto: parseFloat(e.target.value),
              })
            }
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="w-100">
          <label
            htmlFor="id_categoria_produto"
            className="block text-sm font-medium text-gray-700"
          >
            Categoria do Produto
          </label>
          <select
            id="id_categoria_produto"
            name="id_categoria_produto"
            value={produto.id_categoria_produto}
            onChange={(e) =>
              setProduto({
                ...produto,
                id_categoria_produto: parseInt(e.target.value),
              })
            }
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Selecione a Categoria</option>
            {categorias.map((categoria) => (
              <option
                key={categoria.id_categoria_produto}
                value={categoria.id_categoria_produto}
              >
                {categoria.nome_categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/produtos")}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg"
            disabled={isLoading}
          >
            {isLoading
              ? "Salvando..."
              : isEdit
              ? "Atualizar Produto"
              : "Criar Produto"}
          </button>
        </div>
      </form>
    </div>
  );
}
