# Backend на Node.js - Тестовое задание

> Разработать REST API для управления библиотекой книг. Стек: Express, TypeScript, Sequelize, PostgreSQL. Архитектура: Controller - Service - Repository. Результат упаковать в Docker.

**Архитектура Controller - Service - Repository:**
- [Repository Pattern (Martin Fowler)](https://martinfowler.com/eaaCatalog/repository.html)
- [Service Layer (Martin Fowler)](https://martinfowler.com/eaaCatalog/serviceLayer.html)
- [Repository Pattern in Node.js & Express - полный гайд с примерами](https://omacy.medium.com/implementing-the-repository-design-pattern-in-node-js-express-a-complete-guide-354cfadc22a0)
- [TypeScript + Node.js Enterprise Patterns (Controller, Service, Repository)](https://medium.com/slalom-build/typescript-node-js-enterprise-patterns-630df2c06c35)
- [Repository Pattern with TypeScript and Node.js (LogRocket)](https://blog.logrocket.com/exploring-repository-pattern-typescript-node/)
- [Clean Architecture in Node.js: Repository Pattern + TypeScript](https://blog.alexrusin.com/clean-architecture-in-node-js-implementing-the-repository-pattern-with-typescript-and-prisma/)

---

## Требования к стеку

- Node.js 20+
- TypeScript (strict mode)
- Express
- Sequelize (ORM)
- PostgreSQL
- Docker, Docker Compose

---

## Шаг 1 - Инициализация проекта

Необходимо создать проект со следующей структурой:

```
book-api/
├── src/
│   ├── controllers/
│   │   ├── author.controller.ts
│   │   └── book.controller.ts
│   ├── services/
│   │   ├── base.service.ts
│   │   ├── author.service.ts
│   │   └── book.service.ts
│   ├── repositories/
│   │   ├── author.repository.ts
│   │   └── book.repository.ts
│   ├── models/
│   │   ├── author.model.ts
│   │   └── book.model.ts
│   ├── routes/
│   │   ├── author.routes.ts
│   │   └── book.routes.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   ├── config/
│   │   └── database.ts
│   ├── types/
│   │   └── index.ts
│   └── app.ts
├── Dockerfile
├── docker-compose.yml
├── tsconfig.json
├── package.json
└── README.md
```

Инициализировать проект, установить зависимости, настроить `tsconfig.json` со strict mode.

**Документация:**
- [Express](https://expressjs.com/)
- [Sequelize TypeScript docs](https://sequelize.org/docs/v6/other-topics/typescript/)

---

## Шаг 2 - Модели данных

Необходимо описать две модели через Sequelize:

### Author

| Поле       | Тип      | Ограничения              |
|------------|----------|--------------------------|
| id         | INTEGER  | PK, auto increment       |
| firstName  | STRING   | not null                 |
| lastName   | STRING   | not null                 |
| biography  | TEXT     | nullable                 |
| birthYear  | INTEGER  | nullable                 |
| createdAt  | DATE     | auto                     |
| updatedAt  | DATE     | auto                     |

### Book

| Поле        | Тип      | Ограничения              |
|-------------|----------|--------------------------|
| id          | INTEGER  | PK, auto increment       |
| title       | STRING   | not null                 |
| isbn        | STRING   | not null, unique         |
| publishYear | INTEGER  | nullable                 |
| genre       | STRING   | nullable                 |
| authorId    | INTEGER  | FK -> Author, not null   |
| createdAt   | DATE     | auto                     |
| updatedAt   | DATE     | auto                     |

Связь: Author hasMany Books, Book belongsTo Author.

**Документация:**
- [Sequelize Model Definition](https://sequelize.org/docs/v6/core-concepts/model-basics/)
- [Sequelize Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)

---

## Шаг 3 - Слой Repository

Репозитории инкапсулируют работу с базой данных. Каждый репозиторий работает только со своей моделью.

### AuthorRepository

Методы:
- `findAll()` - все авторы
- `findById(id)` - автор по ID
- `create(data)` - создание
- `update(id, data)` - обновление
- `delete(id)` - удаление

### BookRepository

Методы:
- `findAll(filters?)` - все книги с опциональной фильтрацией по `genre` и `authorId`
- `findById(id)` - книга по ID (с данными автора)
- `create(data)` - создание
- `update(id, data)` - обновление
- `delete(id)` - удаление

При получении книги по ID необходимо включать данные автора (Sequelize `include`).

---

## Шаг 4 - Слой Service

Сервисы содержат бизнес-логику и вызывают репозитории. Контроллеры не обращаются к репозиториям напрямую.

### Бизнес-логика, которую необходимо реализовать:

- При создании книги - проверить, что автор с указанным `authorId` существует. Если нет - вернуть ошибку
- При удалении автора - проверить, что у него нет книг. Если есть - вернуть ошибку с сообщением "Cannot delete author with existing books"
- При создании книги - проверить уникальность `isbn`. Если книга с таким ISBN уже есть - вернуть ошибку

Сервисы должны выбрасывать типизированные ошибки (например, класс `AppError` с полями `statusCode` и `message`).

---

## Шаг 5 - Слой Controller

Контроллеры принимают HTTP-запросы, вызывают сервисы и формируют ответы.

### Эндпоинты Author:

| Метод  | Путь            | Описание              | Коды ответа       |
|--------|-----------------|----------------------|-------------------|
| GET    | /api/authors    | Список всех авторов  | 200               |
| GET    | /api/authors/:id| Автор по ID          | 200, 404          |
| POST   | /api/authors    | Создать автора       | 201, 400          |
| PUT    | /api/authors/:id| Обновить автора      | 200, 404, 400     |
| DELETE | /api/authors/:id| Удалить автора       | 204, 404, 409     |

### Эндпоинты Book:

| Метод  | Путь           | Описание                      | Коды ответа       |
|--------|----------------|------------------------------|-------------------|
| GET    | /api/books     | Список книг (query: genre, authorId) | 200       |
| GET    | /api/books/:id | Книга по ID (с автором)      | 200, 404          |
| POST   | /api/books     | Создать книгу                | 201, 400, 404     |
| PUT    | /api/books/:id | Обновить книгу               | 200, 404, 400     |
| DELETE | /api/books/:id | Удалить книгу                | 204, 404          |

### Формат ответов:

Успех:
```json
{
  "data": { ... }
}
```

Ошибка:
```json
{
  "error": {
    "message": "Author not found",
    "statusCode": 404
  }
}
```

Необходимо реализовать middleware для централизованной обработки ошибок (`errorHandler.ts`).

**Документация:**
- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)

---

## Шаг 6 - Валидация входных данных

Необходимо добавить базовую валидацию в контроллерах или отдельным middleware:

- POST/PUT Author: `firstName` и `lastName` обязательны, строки не пустые
- POST/PUT Book: `title`, `isbn`, `authorId` обязательны
- `isbn` - строка, непустая
- `authorId` - число
- `publishYear` - если передан, должен быть числом

При ошибке валидации - ответ 400 с понятным сообщением.

---

## Шаг 7 - Docker

### Dockerfile

Необходимо написать `Dockerfile` для приложения:
- Базовый образ: `node:20-alpine`
- Установка зависимостей
- Сборка TypeScript
- Запуск скомпилированного JS из `dist/`
- Приложение не должно запускаться от root-пользователя

### docker-compose.yml

Необходимо написать `docker-compose.yml` с двумя сервисами:

| Сервис     | Образ               | Порты      |
|------------|---------------------|------------|
| `app`      | билд из `./`        | 3000:3000  |
| `postgres` | postgres:16-alpine  | -          |

Требования:
- `postgres` - пароль, пользователь и имя БД через переменные окружения
- `postgres` - данные в именованном volume
- `postgres` - healthcheck через `pg_isready`
- `app` - зависит от `postgres` (`depends_on` с `condition: service_healthy`)
- `app` - переменные подключения к БД через environment
- Sequelize должен выполнять `sync` при старте (создание таблиц)

### Проверки после запуска:

```bash
docker-compose up --build
```

```bash
# создать автора
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Лев", "lastName": "Толстой", "birthYear": 1828}'

# создать книгу
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Война и мир", "isbn": "978-5-17-006403-9", "publishYear": 1869, "genre": "роман", "authorId": 1}'

# получить книгу с автором
curl http://localhost:3000/api/books/1

# фильтрация по жанру
curl "http://localhost:3000/api/books?genre=роман"

# попытка удалить автора с книгами - должна вернуть 409
curl -X DELETE http://localhost:3000/api/authors/1

# удалить книгу, потом автора - должно пройти
curl -X DELETE http://localhost:3000/api/books/1
curl -X DELETE http://localhost:3000/api/authors/1
```

**Документация:**
- [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
- [Compose file reference](https://docs.docker.com/reference/compose-file/)
- [Sequelize sync](https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization)

---

## Шаг 8 - Рефакторинг: абстрактный базовый сервис

После того как CRUD для авторов и книг работает, можно заметить, что `AuthorService` и `BookService` содержат много одинакового кода: `getAll`, `getById`, `create`, `update`, `delete` - отличается только репозиторий и специфическая бизнес-логика.

Необходимо вынести общую логику в абстрактный класс `BaseService<T>`, который принимает репозиторий и предоставляет базовую CRUD-реализацию.

### Файл `src/services/base.service.ts`

Примерный интерфейс:

```typescript
export abstract class BaseService<T> {
  constructor(protected readonly repository: IRepository<T>) {}

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<T> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new AppError(404, 'Entity not found');
    }
    return entity;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    await this.getById(id);
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    return this.repository.delete(id);
  }
}
```

### Интерфейс `IRepository<T>`

Необходимо описать в `src/types/index.ts`:

```typescript
export interface IRepository<T> {
  findAll(filters?: Record<string, unknown>): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}
```

Репозитории должны реализовывать этот интерфейс.

### Рефакторинг сервисов

После создания `BaseService`:

- `AuthorService extends BaseService<Author>` - в конструктор передается `AuthorRepository`. Метод `delete` переопределяется, чтобы добавить проверку на наличие книг
- `BookService extends BaseService<Book>` - в конструктор передается `BookRepository`. Метод `create` переопределяется для проверки существования автора и уникальности ISBN

Стандартные CRUD-методы (`getAll`, `getById`, `update`) наследуются без изменений.

**Документация:**
- [TypeScript Abstract Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

---

## Шаг 9 - Оформление

В `README.md` должны быть:
- Описание проекта
- Используемый стек
- Структура проекта с кратким пояснением каждого слоя (Controller, Service, Repository)
- Команды для запуска через Docker Compose
- Примеры запросов к API (curl или аналог)

---

## Чеклист сдачи

- [ ] Проект на TypeScript, strict mode
- [ ] Архитектура Controller - Service - Repository соблюдена (контроллеры не обращаются к моделям/репозиториям напрямую)
- [ ] Две модели с связью hasMany/belongsTo
- [ ] CRUD для авторов и книг
- [ ] Бизнес-логика: проверка автора при создании книги, запрет удаления автора с книгами, уникальность ISBN
- [ ] Валидация входных данных с понятными ошибками
- [ ] Централизованная обработка ошибок через middleware
- [ ] Фильтрация книг по genre и authorId через query-параметры
- [ ] GET книги по ID возвращает данные автора
- [ ] Dockerfile, docker-compose.yml, `docker-compose up --build` поднимает рабочее приложение
- [ ] Абстрактный `BaseService<T>` с базовым CRUD, конкретные сервисы наследуются и переопределяют только специфичную логику
- [ ] Интерфейс `IRepository<T>`, репозитории его реализуют
- [ ] README с описанием и примерами
