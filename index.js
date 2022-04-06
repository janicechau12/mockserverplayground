const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require("graphql-tools");
 
const sdlSchema = `
  type Query {
    getWorkPeriods: [WorkPeriod!]!
    getInWorkStatus: InWorkStatus!
  }
 
  type Mutation {
    startWorkPeriod: WorkPeriod!
    endWorkPeriod(workPeriodId: UUID!): WorkPeriod!
  }
 
  type TenantUser {
    id: UUID!
    nickname: String!
  }
 
  type WorkPeriod {
    id: UUID!
    tenantUser: TenantUser!
    start: DateTime!
    end: DateTime
  }
 
  type InWorkStatus {
    inWork: Boolean!
  }
 
  scalar UUID
  scalar DateTime
`;
 
const WorkPeriod = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    tenantUser: {
        id: '400ed12f-1BED-40d2-cd00-100233111000',
        nickname: 'Mamie Johnston',
    },
    start: '2022-03-30T09:00:00',
    end: '2022-03-30T09:50:00',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    tenantUser: {
        id: '400ed12f-1BED-40d2-cd00-100233111000',
        nickname: 'Mamie Johnston',
    },
    start: '2022-03-30T10:00:00',
    end: '2022-03-30T13:00:00',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    tenantUser: {
        id: '400ed12f-1BED-40d2-cd00-100233111000',
        nickname: 'Mamie Johnston',
    },
    start: '2022-03-30T16:30:00',
    end: '2022-03-30T17:00:00',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    tenantUser: {
        id: '400ed12f-1BED-40d2-cd00-100233111000',
        nickname: 'Mamie Johnston',
    },
    start: '2022-03-30T17:00:00',
    end: '2022-03-30T18:40:00',
  },
];
 
const StartWorkPeriod = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  tenantUser: {
      id: '400ed12f-1BED-40d2-cd00-100233111000',
      nickname: 'Mamie Johnston',
  },
  start: '2022-04-01T10:48:00',
};
 
const EndWorkPeriod = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  tenantUser: {
      id: '400ed12f-1BED-40d2-cd00-100233111000',
      nickname: 'Mamie Johnston',
  },
  start: '2022-04-01T10:48:00',
  end: '2022-04-01T11:20:00',
};
 
const resolvers = {
  Query: {
    getWorkPeriods: () => WorkPeriod,
  },
  Mutation: {
    startWorkPeriod: () => StartWorkPeriod,
    endWorkPeriod: (UUID) => EndWorkPeriod,   
  }
};
 
const schema = makeExecutableSchema({
  typeDefs: sdlSchema,
  resolvers
});
 
const server = new ApolloServer({ schema });
 
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});