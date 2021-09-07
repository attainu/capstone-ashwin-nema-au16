import { Switch, Route } from "react-router-dom"
import routes from "./routes"
import { Layout } from "./components"
const App = () => {
  return (
    <Layout>

        <Switch>
          {
            routes.map((route, idx) => {
              return (
                <Route key={idx} {...route} />
              )
            })
          }
        </Switch>

    </Layout>

  )
}

export default App