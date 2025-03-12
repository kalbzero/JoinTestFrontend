import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Bem-vindo ao Sistema!</h1>
        <div>
          <Link href="/produtos">
            <a className="inline-block px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-600 mb-4">
              Ir para Listagem de Produtos
            </a>
          </Link>
        </div>
        <div>
          <Link href="/categorias">
            <a className="inline-block px-6 py-3 bg-green-500 text-white text-lg rounded-lg shadow-md hover:bg-green-600">
              Ir para Listagem de Categorias
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
