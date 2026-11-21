import HeroSzene from './HeroSzene.astro'
import Seitenkopf from './Seitenkopf.astro'
import Intro from './Intro.astro'
import Warum from './Warum.astro'
import Pfeile from './Pfeile.astro'
import Stufen from './Stufen.astro'
import Karten from './Karten.astro'
import Kundenstimmen from './Kundenstimmen.astro'
import Service from './Service.astro'
import Angebote from './Angebote.astro'
import Kompetenz from './Kompetenz.astro'
import Ansprechpartner from './Ansprechpartner.astro'
import RatgeberTeaser from './RatgeberTeaser.astro'
import Cta from './Cta.astro'
import CtaBand from './CtaBand.astro'
import Prozess from './Prozess.astro'
import Liste from './Liste.astro'
import Text from './Text.astro'
import Region from './Region.astro'
import Kontakt from './Kontakt.astro'
import Faq from './Faq.astro'
import Team from './Team.astro'
import Zeitstrahl from './Zeitstrahl.astro'
import Referenzen from './Referenzen.astro'
import Siegel from './Siegel.astro'
import Wertermittlung from './Wertermittlung.astro'

/** blockType (Payload) → Komponente */
export const BLOCKS: Record<string, any> = {
  heroSzene: HeroSzene, seitenkopf: Seitenkopf, intro: Intro, warum: Warum, pfeile: Pfeile, stufen: Stufen,
  karten: Karten, kundenstimmen: Kundenstimmen, service: Service, angebote: Angebote, kompetenz: Kompetenz,
  ansprechpartner: Ansprechpartner, ratgeberTeaser: RatgeberTeaser, cta: Cta, ctaBand: CtaBand, prozess: Prozess,
  liste: Liste, text: Text, region: Region, kontakt: Kontakt, faq: Faq, team: Team, zeitstrahl: Zeitstrahl,
  referenzen: Referenzen, siegel: Siegel, wertermittlung: Wertermittlung,
}
