import { Switch, Route } from "react-router-dom"
import routes from "./routes"
import { Layout } from "./components"
import { ScrollToTop } from './utils'

const App = () => {
  return (
    <Layout>
      <ScrollToTop >
        <Switch>
          {
            routes.map((route, idx) => {
              return (
                <Route key={idx} {...route} />
              )
            })
          }
        </Switch>
      </ScrollToTop>
    </Layout>

  )
}

export default App