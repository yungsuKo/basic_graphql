import {ApolloServer, gql} from "apollo-server"

const tweets = [
    {
        id: "1",
        text: "1hohohohhihihih",
    },
    {
        id: "2",
        text: "2hohohohhihihih",
    }
]

const typeDefs = gql`
    # data의 shape을 지정하는 것.
    # rest api에서 GET /text등을 설정하는 것과 동일한 것임.
    type User {
        id: ID!
        username: String!
    }
    type Tweet {
        id: ID!
        text: String!
        author: User
    }
    type Query {
        allTweets: [Tweet!]!
        tweet(id:ID): Tweet
        ping: String
        # scalar 데이터 타입이란?
    }
    type Mutation {
        postTweet(text: String, userID: ID): Tweet
    }
`;
const resolvers = {
    Query:{
        allTweets(){
            console.log('allTweets')
            return tweets;
        },
        tweet(root, {id}) {
            console.log("i'm called")
            
            return tweets.find((tweet) => tweet.id === id);
        },
        ping() {
            console.log("ping")
        }
    }
}
const server = new ApolloServer({typeDefs, resolvers});


server.listen().then(({url}) => {
    console.log(`running on ${url}`)
})