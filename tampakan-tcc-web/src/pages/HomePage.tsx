import HeroBanner from '../components/home/HeroBanner'
import KeyDetailsStrip from '../components/home/KeyDetailsStrip'
import PreEnrollNowSection from '../components/home/PreEnrollNowSection'
import TimelineSection from '../components/home/TimelineSection'
import ProgramsPreview from '../components/home/ProgramsPreview'
import CtaSection from '../components/home/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <KeyDetailsStrip />
      <PreEnrollNowSection />
      <TimelineSection />
      <ProgramsPreview />
      <CtaSection />
    </>
  )
}
