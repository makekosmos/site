import { AppleLogo, ArrowRight, Download, WindowsLogo } from "../components/Icons";
import { Changelog } from "../agenda/Changelog";
import { localize } from "../i18n";
import { DOWNLOAD_URL } from "../links";
import { detectPlatform } from "../platform";
import { FeatureTable, featureTotal, type FeatureGroup, type Status } from "../ui/FeatureTable";
import { Cta, Footer, Nav } from "../ui/kit";
import { DATE } from "../ui/releases";
import data from "./features.json";

const PLATFORMS = [
  { id: "windows", label: "Windows" },
  { id: "macos", label: "macOS" },
] as const;

const CHANNELS = [{ id: "desktop", label: "Windows · macOS", repo: "makekosmos/memoria-gpui" }];

const groups = data.groups as FeatureGroup<(typeof PLATFORMS)[number]["id"]>[];

const COPY = localize({
  en: {
    title: "Your notes and your diary.",
    lead: " On your computer, in plain Markdown.",
    download: { mac: "Get Mundus for macOS", windows: "Get Mundus for Windows", any: "Get Mundus" },
    install: "Memoria installs from the Mundus app store.",
    features: "What Memoria can do",
    featuresTitle: "What works where",
    checked: (n: number, date: string) => `${n} features, checked against the code on ${date}`,
    feature: "Feature",
    status: { yes: "Available", partial: "Partly, see note", no: "Not yet" } as Record<Status, string>,
    cta: "Write it down. Keep it.",
  },
  ru: {
    title: "Ваши заметки и ваш дневник.",
    lead: " На вашем компьютере, в обычном Markdown.",
    download: { mac: "Скачать Mundus для macOS", windows: "Скачать Mundus для Windows", any: "Скачать Mundus" },
    install: "Memoria ставится из каталога приложений Mundus.",
    features: "Что умеет Memoria",
    featuresTitle: "Что где работает",
    checked: (n: number, date: string) => `${n} функций, сверено с кодом ${date}`,
    feature: "Функция",
    status: { yes: "Есть", partial: "Частично, см. примечание", no: "Пока нет" } as Record<Status, string>,
    cta: "Запишите. Сохраните.",
  },
});

const PLATFORM = detectPlatform();
const PlatformIcon = PLATFORM === "mac" ? AppleLogo : PLATFORM === "windows" ? WindowsLogo : Download;

function Get() {
  return (
    <a className="btn btn-light" href={DOWNLOAD_URL}>
      {COPY.download[PLATFORM ?? "any"]}
      <PlatformIcon />
    </a>
  );
}

export function MemoriaPage() {
  return (
    <>
      <Nav current="/memoria" />
      <main>
        <section className="wrap hero">
          <h1 className="title">
            {COPY.title}
            <span className="muted">{COPY.lead}</span>
          </h1>
          <div className="actions">
            <Get />
            <a className="btn btn-dark" href="#features">
              {COPY.features}
              <ArrowRight />
            </a>
          </div>
          <p className="muted">{COPY.install}</p>
        </section>

        <section className="section" id="features" aria-labelledby="features-title">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2-lg" id="features-title">
                {COPY.featuresTitle}
              </h2>
              <p className="muted">{COPY.checked(featureTotal(groups), DATE.format(new Date(data.checked)))}</p>
            </div>
            <FeatureTable groups={groups} platforms={PLATFORMS} featureLabel={COPY.feature} status={COPY.status} />
          </div>
        </section>

        <Changelog channels={CHANNELS} />

        <Cta title={COPY.cta}>
          <Get />
        </Cta>
      </main>
      <Footer />
    </>
  );
}
