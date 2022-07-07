
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Book } from './../../modules/books/entities/book.entity';

export default class SeedBooks implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Book)
      .values([
        {
          title: 'Liderança em Design',
          subtitle: 'Habilidades de gestão para alavancar sua carreira',
          description: 'Sem descrição.',
          isbn: '978-65-86110-64-7',
          author: 'Victor Zanini',
          publishingCompany: 'Casa do Código',
          language: 'pt-br',
          releaseDate: '2021-02-01',
          coverType: 'Capa Simples',
          numberOfPages: 238,
          value: 69.90
        },
        {
          title: 'User Experience Design',
          subtitle: 'Como criar produtos digitais com foco nas pessoas',
          description: 'Sem descrição.',
          isbn: '978-85-94188-66-3',
          author: 'Rogério Pereira',
          publishingCompany: 'Casa do Código',
          language: 'pt-br',
          releaseDate: '2018-06-01',
          coverType: 'Capa Simples',
          numberOfPages: 196,
          value: 69.90
        },
        {
          title: 'Inbound Marketing',
          subtitle: 'Estratégias práticas para empresas e projetos',
          description: 'Sem descrição.',
          isbn: '978-85-7254-017-9',
          author: 'Adriélly Calil',
          publishingCompany: 'Casa do Código',
          language: 'pt-br',
          releaseDate: '2019-06-01',
          coverType: 'Capa Simples',
          numberOfPages: 143,
          value: 49.90
        },
        {
          title: 'Marketing de conteúdo',
          subtitle: 'Estratégias para entregar o que seu público quer consumir',
          description: 'Sem descrição',
          isbn: '978-85-94188-36-6',
          author: 'Jonathan Lamim',
          publishingCompany: 'Casa do Código',
          language: 'pt-br',
          releaseDate: '2017-12-01',
          coverType: 'Capa Simples',
          numberOfPages: 2013,
          value: 69.90
        },
        {
          title: 'Jogos com Scratch',
          subtitle: 'Em projetos práticos com linguagem de blocos',
          description: 'Sem descrição.',
          isbn: '978-65-86110-59-3',
          author: 'Carlos Emilio Padilla Severo',
          publishingCompany: 'Casa do Código',
          language: 'pt-br',
          releaseDate: '2021-02-01',
          coverType: 'Capa Simples',
          numberOfPages: 314,
          value: 79.90
        },
        {
          title: 'A lógica do jogo',
          subtitle: 'Recriando clássicos da história dos videogames',
          description: 'Sem descrição',
          isbn: '978-85-5519-126-8',
          author: 'Marcus Becker',
          publishingCompany: 'Casa do Código',
          language: 'pt-br',
          releaseDate: '2016-01-01',
          coverType: 'Capa Simples',
          numberOfPages: 288,
          value: 79.90
        },
        {
          title: 'Lógica de Programação',
          subtitle: 'Crie seus primeiros programas usando Javascript e HTML',
          description: 'Sem descrição.',
          isbn: '978-85-66250-22-0',
          author: 'Paulo Silveira, Adriano Almeida',
          publishingCompany: 'Casa do Código',
          language: 'pt-br',
          releaseDate: '2012-05-01',
          coverType: 'Capa Simples',
          numberOfPages: 180,
          value: 59.90
        },
        {
          title: 'Construct 2',
          subtitle: 'Crie o seu primeiro jogo multiplataforma',
          description: 'Sem descrição',
          isbn: '978-85-94188-39-7',
          author: 'Bruna Escudelario, Diego Martins de Pinho',
          publishingCompany: 'Casa do Código',
          language: 'pt-br',
          releaseDate: '2018-01-01',
          coverType: 'Capa Simples',
          numberOfPages: 227,
          value: 69.90
        }
      ])
      .execute()

    await connection.query(
      'INSERT INTO books_categories (book_id, category_id) VALUES '+
      '(1, 1),'+
      '(2, 1),'+
      '(3, 2),'+
      '(4, 2),'+
      '(5, 3),'+
      '(5, 4),'+
      '(6, 3),'+
      '(6, 4),'+
      '(7, 3),'+
      '(8, 4);');
  }
}
