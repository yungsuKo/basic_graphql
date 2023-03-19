import {ApolloServer, gql} from "apollo-server"

let tweets = [
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
        userId: ID!
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
        postTweet(text: String, userId: ID): Tweet
        deleteTweet(id: ID): Boolean!
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
    },
    Mutation:{
        postTweet(root, {text, userId}){
            const newTweet = {
                id : tweets.length + 1,
                text
            }
            tweets.push(newTweet);
            console.log(tweets);
            return newTweet;
        },
        deleteTweet(root,{id}){
            const tweet = tweets.find((tweet)=> tweet.id===id);
            if(!tweet) return false;
            tweets = tweets.filter((tweet)=>tweet.id !== id)
            return true;
        }
    }
}
const server = new ApolloServer({typeDefs, resolvers});


server.listen().then(({url}) => {
    console.log(`running on ${url}`)
})