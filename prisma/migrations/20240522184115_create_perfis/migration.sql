-- CreateTable
CREATE TABLE "Perfis" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Perfis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_id_perfil_fkey" FOREIGN KEY ("id_perfil") REFERENCES "Perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
