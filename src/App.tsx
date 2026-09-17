import { DeckShell } from './components/deck/DeckShell'
import { Architecture } from './sections/Architecture'
import { BusinessValue } from './sections/BusinessValue'
import { Closing } from './sections/Closing'
import { Differentiators } from './sections/Differentiators'
import { Hero } from './sections/Hero'
import { IndustryLandscape } from './sections/IndustryLandscape'
import { LlmStrategy } from './sections/LlmStrategy'
import { Market } from './sections/Market'
import { NvidiaServices } from './sections/NvidiaServices'
import { Problem } from './sections/Problem'
import { Roadmap } from './sections/Roadmap'
import { Scaling } from './sections/Scaling'
import { Solution } from './sections/Solution'
import { TrustEvaluation } from './sections/TrustEvaluation'
import { WhyNvidia } from './sections/WhyNvidia'

function App() {
  return (
    <DeckShell>
      <Hero />
      <Problem />
      <IndustryLandscape />
      <Market />
      <Solution />
      <Architecture />
      <NvidiaServices />
      <TrustEvaluation />
      <LlmStrategy />
      <Differentiators />
      <WhyNvidia />
      <BusinessValue />
      <Scaling />
      <Roadmap />
      <Closing />
    </DeckShell>
  )
}

export default App
