"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "it";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Define translation key type to ensure type safety
type TranslationKey =
  // Navigation
  | "nav.home"
  | "nav.bikes"
  | "nav.g1series"
  | "nav.news"
  | "nav.corporate"
  | "nav.contact"
  | "nav.about"

  // Hero section
  | "hero.title"
  | "hero.subtitle"
  | "hero.description"

  // Corporate section
  | "corporate.mission"
  | "corporate.vision"
  | "corporate.values"
  | "corporate.schedule"
  | "corporate.info"
  | "corporate.title"
  | "corporate.description"
  | "corporate.overview.part1"
  | "corporate.overview.part2"
  | "corporate.development.title"
  | "corporate.development.description"
  | "corporate.schedule.title"

  // Schedule
  | "schedule.summer2025"
  | "schedule.fall2025"
  | "schedule.eicma2025"
  | "schedule.winter2025"
  | "schedule.spring2026"
  | "schedule.summer2026"
  | "schedule.fall2026"
  | "schedule.january2027"
  | "schedule.roadTesting"
  | "schedule.investorPresentations"
  | "schedule.formalLaunch"
  | "schedule.furtherTesting"
  | "schedule.designFinalization"
  | "schedule.factoryDevelopment"
  | "schedule.preOrders"
  | "schedule.salesLaunch"
  | "schedule.detailedInfo"
  | "schedule.additionalPlans"

  // Values
  | "values.emotion"
  | "values.innovation"
  | "values.sustainability"
  | "values.integrity"
  | "values.independence"
  | "values.emotion.description"
  | "values.innovation.description"
  | "values.sustainability.description"
  | "values.integrity.description"
  | "values.independence.description"

  // Mission & Vision
  | "mission.title"
  | "mission.description"
  | "vision.title"
  | "vision.description"

  // Common
  | "common.readMore"
  | "common.getInTouch"
  | "cta.refundableLine"
  | "cta.faqLabel"
  | "cta.termsLabel"
  | "cta.andConnector"

  // Home page
  | "home.craft.title"
  | "home.craft.description"
  | "home.craft.button"
  | "home.tagline"
  | "home.news.title"
  | "home.news.description"
  | "home.specs.batteries"
  | "home.specs.weight"
  | "home.specs.range"
  | "home.specs.topSpeed"
  | "home.specs.capacity"
  | "home.specs.power"
  | "home.bikes.title"
  | "home.bikes.description1"
  | "home.bikes.description2"
  | "home.bikes.g1s.startingPrice"
  | "home.bikes.g1x.startingPrice"
  | "home.bikes.g1s.originalStartingPrice"
  | "home.bikes.g1x.originalStartingPrice"
  | "home.bikes.discountInline.prefix"
  | "home.bikes.discountInline.suffix"
  | "home.gallery.title"
  | "home.gallery.description"
  | "home.follow.title"
  | "home.gallery.overlay.line1"
  | "home.gallery.overlay.line2"
  | "home.gallery.overlay.line3"
  | "home.gallery.overlay.text"
  | "home.gallery.card.smartTech.title"
  | "home.gallery.card.smartTech.description"
  | "home.gallery.card.utility.title"
  | "home.gallery.card.utility.description"
  | "home.gallery.card.materials.title"
  | "home.gallery.card.materials.description"
  | "home.gallery.card.security.title"
  | "home.gallery.card.security.description"
  | "home.faq.title"
  | "home.faq.subtitle"
  | "home.faq.visitG1S"
  | "home.faq.visitG1X"
  | "home.faq.licenseLabel"
  | "home.specs.battery"
  | "home.specs.charging"
  | "home.specs.payload"

  // Bikes
  | "bikes.price"
  | "bikes.darkKnight"
  | "bikes.streetMoto"

  // Checkout
  | "checkout.breadcrumb"
  | "checkout.orderSummary.title"
  | "checkout.payment.title"
  | "checkout.payment.description"
  | "checkout.express.title"
  | "checkout.personal.title"
  | "checkout.card.title"
  | "checkout.badge.card"
  | "checkout.badge.wallet"
  | "checkout.placeholder.email"
  | "checkout.placeholder.phone"
  | "checkout.placeholder.company"
  | "checkout.placeholder.country"
  | "checkout.placeholder.tshirt"
  | "checkout.placeholder.address1"
  | "checkout.placeholder.address2"
  | "checkout.placeholder.firstName"
  | "checkout.placeholder.lastName"
  | "checkout.placeholder.city"
  | "checkout.summary.estimateLabel"
  | "checkout.summary.dueToday"
  | "checkout.summary.reservationLabel"
  | "checkout.newsletter.label"
  | "checkout.agree.prefix"
  | "checkout.placeOrder"
  | "checkout.legal.note"
  | "home.faq.cost.g1s"
  | "home.faq.cost.g1s.list"
  | "home.faq.cost.g1x"
  | "home.faq.cost.g1x.list"

  // About us
  | "about.title"
  | "about.description"
  | "about.story.title"
  | "about.story.part1"
  | "about.story.part2"
  | "about.story.tagline"
  | "about.founders.title"
  | "about.founders.background"
  | "about.founders.omar.background"
  | "about.founders.philip.background"
  | "about.founders.jamal.background"

  // Contact
  | "contact.title"
  | "contact.description"
  | "contact.form.name"
  | "contact.form.email"
  | "contact.form.message"
  | "contact.form.submit"
  | "contact.form.firstName"
  | "contact.form.lastName"
  | "contact.form.sending"
  | "contact.form.send"
  | "contact.workTogether"
  | "contact.generalEnquiries"
  | "contact.pressEnquiries"
  | "contact.pressDescription"
  | "contact.socialMedia"
  | "contact.successMessage"
  | "contact.errorMessage"
  | "contact.getInTouch"

  // News
  | "news.title"
  | "news.description"
  | "news.readMore"
  | "news.backToNews"
  | "news.loading"
  | "news.notFound"
  | "news.views"
  | "news.comments"
  | "news.by"

  // Corporate
  | "corporate.title"
  | "corporate.description"
  | "corporate.conferences.title"
  | "corporate.conferences.description"
  | "corporate.distributors.title"
  | "corporate.distributors.description"
  | "corporate.investors.title"
  | "corporate.investors.description"
  | "corporate.work.title"
  | "corporate.work.description"
  | "corporate.fleetSales.title"
  | "corporate.fleetSales.description"

  // Conferences
  | "conferences.events.sifted.title"
  | "conferences.events.sifted.p1"
  | "conferences.events.sifted.p2"
  | "conferences.events.sifted.linkText"
  | "conferences.events.sifted.linkUrl"
  | "conferences.events.sifted.link"
  | "conferences.events.sevenstar.title"
  | "conferences.events.sevenstar.p1"
  | "conferences.events.k2match.title"
  | "conferences.events.k2match.p1"
  | "conferences.events.k2match.link"
  | "conferences.events.eicma.title"
  | "conferences.events.eicma.p1"
  | "conferences.events.eicma.link"
  | "conferences.events.websummit.title"
  | "conferences.events.websummit.p1"
  | "conferences.events.websummit.link"

  // Corporate subpages - Distributors
  | "distributors.offer.title"
  | "distributors.offer.item1"
  | "distributors.offer.item2"
  | "distributors.offer.item3"
  | "distributors.offer.item4"
  | "distributors.offer.item5"
  | "distributors.offer.item6"
  | "distributors.expect.title"
  | "distributors.expect.item1"
  | "distributors.expect.item2"
  | "distributors.expect.item3"
  | "distributors.expect.item4"
  | "distributors.countries.paragraph"
  | "distributors.priority1"
  | "distributors.priority2"
  | "distributors.priority3"
  | "distributors.priority4"
  | "distributors.priority1.countries"
  | "distributors.priority2.countries"
  | "distributors.priority3.countries"
  | "distributors.priority4.countries"

  // Corporate subpages - Investors
  | "investors.items.raise.title"
  | "investors.items.raise.value"
  | "investors.items.representation.title"
  | "investors.items.representation.value"
  | "investors.items.return.title"
  | "investors.items.return.value"
  | "investors.items.closing.title"
  | "investors.items.closing.value"
  | "investors.items.capTable.title"
  | "investors.items.capTable.item1"
  | "investors.items.capTable.item2"
  | "investors.items.capTable.item3"
  | "investors.useOfFunds.title"
  | "investors.useOfFunds.amount"
  | "investors.useOfFunds.factoryRenovation"
  | "investors.useOfFunds.factoryEquipment"
  | "investors.useOfFunds.moulds"
  | "investors.useOfFunds.additionalRD"
  | "investors.useOfFunds.market1"
  | "investors.useOfFunds.market2"
  | "investors.useOfFunds.productionCapital"
  | "investors.useOfFunds.productionStaff"
  | "investors.useOfFunds.utilities"
  | "investors.useOfFunds.total"
  | "investors.contact"
  | "investors.contact.email"

  // Corporate subpages - Work With Us
  | "work.procurement.title"
  | "work.procurement.website"
  | "work.procurement.branding"
  | "work.procurement.website.deadline"
  | "work.procurement.branding.deadline"
  | "work.status.closed"
  | "work.status.openContingent"
  | "work.deadline"
  | "work.recruitment.title"
  | "work.recruitment.qualityManager"
  | "work.recruitment.productionManager"
  | "work.recruitment.eicmaTemp"
  | "work.recruitment.eicmaTemp.deadline"

  // Footer
  | "footer.rights"
  | "footer.privacy"
  | "footer.terms"
  | "footer.workWithUs"
  | "footer.legal"
  | "footer.warranty"
  | "footer.reservationTerms"
  | "footer.newsletter.title"
  | "footer.newsletter.description"
  | "footer.newsletter.joinNow"
  | "footer.newsletter.success"
  | "footer.newsletter.networkError"

  // Language toggle
  | "language"
  | "language.english"
  | "language.italian"

  // Common
  | "common.readMore"
  | "common.loading"
  | "common.error"
  | "common.reserveNow"
  | "common.explore"
  | "common.details"
  | "common.privacyPolicy"
  | "common.termsOfUse"

  // CTA page
  | "cta.hero.title"
  | "cta.hero.subtitle"
  | "cta.hero.button"
  | "cta.modal.title"
  | "cta.modal.subtitle"
  | "cta.form.namePlaceholder"
  | "cta.form.countryPlaceholder"
  | "cta.form.noResults"
  | "cta.form.emailPlaceholder"
  | "cta.form.submit"
  | "cta.form.submitting"
  | "cta.form.emailRequired"
  | "cta.form.emailInvalid"
  | "cta.success"
  | "cta.error.generic"
  | "cta.privacy"
  | "cta.success.title"
  | "cta.success.description"
  | "cta.success.notNow"
  | "cta.success.reserveNowCta"
  | "cta.choose.title"
  | "cta.choose.description"
  | "cta.choose.back"
  | "cta.promo.foundersTitle"
  // Promo popup
  | "promo.popup.title"
  | "promo.popup.discount"
  | "promo.popup.depositLine"
  | "promo.popup.refundableLine"
  | "promo.popup.closeAriaLabel"
  // Home FAQ question titles
  | "home.faq.q.keySpecs"
  | "home.faq.q.range"
  | "home.faq.q.cost"
  | "home.faq.q.license"
  | "home.faq.q.removableBatteries"
  | "home.faq.q.chargeTime"
  | "home.faq.q.carCharging"
  | "home.faq.q.motorway"
  | "home.faq.q.twoRiders"
  | "home.faq.q.difference"
  | "home.faq.q.theftResistant"
  | "home.faq.q.tyresWheels"
  | "home.faq.q.seeOrTest"
  | "home.faq.q.appLaunch"
  | "home.faq.q.warranty"
  | "home.faq.q.euHomologation"
  | "home.faq.q.versions"
  | "home.faq.q.colorsConfigs"
  | "home.faq.q.order"
  | "home.faq.q.reservationProcess"
  | "home.faq.q.deliveriesStart"
  | "home.faq.q.outsideEU"
  | "home.faq.q.financing"
  // Home FAQ answers
  | "home.faq.a.keySpecs.list.topSpeed"
  | "home.faq.a.keySpecs.list.range"
  | "home.faq.a.keySpecs.list.battery"
  | "home.faq.a.keySpecs.list.charging"
  | "home.faq.a.keySpecs.list.power"
  | "home.faq.a.keySpecs.list.weight"
  | "home.faq.a.keySpecs.list.payload"
  | "home.faq.a.keySpecs.list.license"
  | "home.faq.a.range.p1"
  | "home.faq.a.cost.list.g1s"
  | "home.faq.a.cost.list.g1x"
  | "home.faq.a.cost.promo.p1"
  | "home.faq.a.cost.expectedTitle"
  | "home.faq.a.cost.expected.g1s"
  | "home.faq.a.cost.expected.g1x"
  | "home.faq.a.cost.discountIntro"
  | "home.faq.a.cost.discount.g1s"
  | "home.faq.a.cost.discount.g1x"
  | "home.faq.a.cost.finalNote"
  | "home.faq.a.cost.linkText"
  | "home.faq.a.license.p1"
  | "home.faq.a.removableBatteries.p1"
  | "home.faq.a.removableBatteries.list.6kwh"
  | "home.faq.a.chargeTime.p1"
  | "home.faq.a.chargeTime.fastTopUp"
  | "home.faq.a.carCharging.p1"
  | "home.faq.a.motorway.p1"
  | "home.faq.a.twoRiders.p1"
  | "home.faq.a.difference.list.1"
  | "home.faq.a.difference.list.2"
  | "home.faq.a.difference.list.3"
  | "home.faq.a.difference.list.4"
  | "home.faq.a.difference.list.5"
  | "home.faq.a.difference.list.6"
  | "home.faq.a.difference.list.7"
  | "home.faq.a.theftResistant.p1"
  | "home.faq.a.tyresWheels.intro"
  | "home.faq.a.tyresWheels.g1s"
  | "home.faq.a.tyresWheels.g1x"
  | "home.faq.a.tyres.frontLabel"
  | "home.faq.a.tyres.rearLabel"
  | "home.faq.a.seeOrTest.p1"
  | "home.faq.a.seeOrTest.p2"
  | "home.faq.a.appLaunch.p1"
  | "home.faq.a.warranty.list.1"
  | "home.faq.a.warranty.list.2"
  | "home.faq.a.warranty.list.3"
  | "home.faq.a.euHomologation.p1"
  | "home.faq.a.versions.p1"
  | "home.faq.a.colorsConfigs.p1"
  | "home.faq.a.order.p1"
  | "home.faq.a.reservationProcess.p1"
  | "home.faq.a.deliveriesStart.p1"
  | "home.faq.a.outsideEU.p1"
  | "home.faq.a.financing.p1"
  // Navigation
  | "nav.tech"
  | "nav.foundersCircle"
  | "nav.quality"
  | "nav.events"
  | "nav.sustainability"
  // Corporate
  | "corporate.distributors.link"
  | "corporate.investors.link"
  | "corporate.fleetSales.link"
  // Corporate subpages - Fleet Sales
  | "fleetSales.headerTitle"
  | "fleetSales.headerDescription"
  | "fleetSales.items.military.title"
  | "fleetSales.items.military.description"
  | "fleetSales.items.rentals.title"
  | "fleetSales.items.rentals.description"
  | "fleetSales.items.resorts.title"
  | "fleetSales.items.resorts.description"
  | "fleetSales.items.natureParks.title"
  | "fleetSales.items.natureParks.description"
  | "fleetSales.items.postCourier.title"
  | "fleetSales.items.postCourier.description"
  | "fleetSales.items.foodDelivery.title"
  | "fleetSales.items.foodDelivery.description"
  // Founders Circle page
  | "founders.title"
  | "founders.discountCta"
  | "founders.reserving.intro.bold"
  | "founders.reserving.intro.p1"
  | "founders.reserving.simpleTitle"
  | "founders.reserving.simpleCopy"
  | "founders.cards.reserve.line1"
  | "founders.cards.reserve.line2"
  | "founders.cards.customize.line1"
  | "founders.cards.customize.line2"
  | "founders.cards.order.line1"
  | "founders.cards.order.line2"
  | "founders.bikes.g1s.title"
  | "founders.bikes.g1s.description"
  | "founders.bikes.g1s.startingPrice"
  | "founders.bikes.discountBadge.g1s"
  | "founders.bikes.discountBadge.g1x"
  | "founders.bikes.footnote"
  | "founders.bikes.reserveButton"
  | "founders.bikes.g1x.title"
  | "founders.bikes.g1x.description"
  | "founders.bikes.g1x.startingPrice"
  | "founders.faq.q.what"
  | "founders.faq.a.what.p1"
  | "founders.faq.a.what.list.1"
  | "founders.faq.a.what.list.2"
  | "founders.faq.a.what.terms"
  | "founders.faq.q.claimDiscount"
  | "founders.faq.a.claimDiscount.p1"
  | "founders.faq.q.expire"
  | "founders.faq.a.expire.p1"
  | "founders.faq.q.depositRisk"
  | "founders.faq.a.depositRisk.p1"
  | "founders.faq.q.reservationBinding"
  | "founders.faq.a.reservationBinding.p1"
  | "founders.faq.q.afterReserve"
  | "founders.faq.a.afterReserve.p1"
  | "founders.faq.q.deliveriesStart"
  | "founders.faq.a.deliveriesStart.p1"
  | "founders.faq.q.transferDiscount"
  | "founders.faq.a.transferDiscount.p1"
  | "founders.faq.q.availability"
  | "founders.faq.a.availability.p1"
  | "founders.faq.q.specChanges"
  | "founders.faq.a.specChanges.p1"
  | "founders.faq.title"
  | "founders.terms.linkText"
  // EICMA page
  | "eicma.work.title"
  | "eicma.work.description"
  | "eicma.meetUsTitle"
  | "eicma.meetUsDetails"
  | "eicma.tagline"

  // Tech page
  | "tech.hero.title"
  | "tech.hero.subtitle"
  | "tech.sections.smartTech"
  | "tech.sections.cameras"
  | "tech.sections.everyday"
  | "tech.sections.crafted"
  | "tech.smart.display.title"
  | "tech.smart.display.description"
  | "tech.smart.charger.title"
  | "tech.smart.charger.description"
  | "tech.smart.keyless.title"
  | "tech.smart.keyless.description"
  | "tech.smart.app.title"
  | "tech.smart.app.description"
  | "tech.cameras.frontRear.title"
  | "tech.cameras.frontRear.description"
  | "tech.cameras.security.title"
  | "tech.cameras.security.description"
  | "tech.everyday.storage.title"
  | "tech.everyday.storage.description"
  | "tech.everyday.racks.title"
  | "tech.everyday.racks.description"
  | "tech.everyday.batteries.title"
  | "tech.everyday.batteries.description"
  | "tech.everyday.onboardCharger.title"
  | "tech.everyday.onboardCharger.description"
  | "tech.everyday.chargeAnywhere.title"
  | "tech.everyday.chargeAnywhere.description"
  | "tech.crafted.materials.title"
  | "tech.crafted.materials.description"
  | "tech.crafted.belt.title"
  | "tech.crafted.belt.description"
  | "tech.crafted.wheels.title"
  | "tech.crafted.wheels.description"
  | "tech.crafted.regenerative.title"
  | "tech.crafted.regenerative.description"

  // G1S page
  | "g1s.hero.title"
  | "g1s.hero.subtitle"
  | "g1s.about.title"
  | "g1s.about.description"
  | "g1s.cta.title"
  | "g1s.cta.discountLine"
  | "g1s.cta.joinFounders"
  | "g1s.cta.price.regularLabel"
  | "g1s.cta.price.regularValue"
  | "g1s.cta.price.untilLabel"
  | "g1s.cta.price.discountValue"
  | "g1s.reserving.title"
  | "g1s.reserving.subtitle"
  | "g1s.reserving.card1"
  | "g1s.reserving.card2"
  | "g1s.reserving.card3"
  | "g1s.specs.title"
  | "g1s.specs.technicalTitle"
  // G1S specs sections
  | "g1s.specs.range.title"
  | "g1s.specs.range.summary"
  | "g1s.specs.powertrain.title"
  | "g1s.specs.powertrain.summary"
  | "g1s.specs.license.title"
  | "g1s.specs.license.summary"
  | "g1s.specs.batteries.title"
  | "g1s.specs.batteries.summary"
  | "g1s.specs.chassis.title"
  | "g1s.specs.chassis.summary"
  | "g1s.specs.dimensions.title"
  | "g1s.specs.dimensions.summary"
  | "g1s.specs.weight.title"
  | "g1s.specs.weight.summary"
  | "g1s.specs.ridingModes.title"
  | "g1s.specs.ridingModes.summary"
  | "g1s.specs.performance.title"
  | "g1s.specs.performance.summary"
  | "g1s.specs.startingPrice.title"
  | "g1s.specs.startingPrice.summary"
  | "g1s.specs.warranty.title"
  | "g1s.specs.warranty.summary"
  // G1S specs detailed lines
  | "g1s.specs.range.combined"
  | "g1s.specs.performance.continuousPower"
  | "g1s.specs.performance.topSpeedMax"
  | "g1s.specs.performance.topSpeedSustained"
  | "g1s.specs.performance.peakTorque"
  | "g1s.specs.performance.peakPower"
  | "g1s.specs.weight.totalWithBattery"
  | "g1s.specs.weight.withoutBattery"
  | "g1s.specs.weight.maxCarryingCapacity"
  | "g1s.specs.powertrain.motorDescription"
  | "g1s.specs.powertrain.controller"
  | "g1s.specs.powertrain.voltage"
  | "g1s.specs.license.details"
  | "g1s.specs.batteries.weight"
  | "g1s.specs.batteries.chemistry"
  | "g1s.specs.chassis.frontSuspension"
  | "g1s.specs.chassis.rearSuspension"
  | "g1s.specs.chassis.frontWheelTravel"
  | "g1s.specs.chassis.rearWheelTravel"
  | "g1s.specs.chassis.frontBrakes"
  | "g1s.specs.chassis.rearBrakes"
  | "g1s.specs.chassis.frontTyre"
  | "g1s.specs.chassis.rearTyre"
  | "g1s.specs.chassis.frontWheel"
  | "g1s.specs.chassis.rearWheel"
  | "g1s.specs.dimensions.seatHeight"
  | "g1s.specs.dimensions.rake"
  | "g1s.specs.dimensions.trail"
  | "g1s.specs.ridingModes.city"
  | "g1s.specs.ridingModes.performance"
  | "g1s.specs.ridingModes.walk"
  | "g1s.specs.ridingModes.reverse"
  // G1S 360 stats labels
  | "g1s.stats.rangeLabel"
  | "g1s.stats.topSpeedLabel"
  | "g1s.stats.carryingCapacityLabel"
  | "g1s.stats.nominalPowerLabel"
  | "g1s.stats.peakPowerLabel"
  | "g1s.stats.removableBatteriesLabel"
  // G1S warranty detailed copy
  | "g1s.specs.warranty.intro"
  | "g1s.specs.warranty.motorcycleYears"
  | "g1s.specs.warranty.batteryYears"
  | "g1s.specs.warranty.coverage"
  | "g1s.specs.warranty.offroad"
  | "g1s.specs.warranty.linkText"

  // G1X page
  | "g1x.specs.title"
  | "g1x.specs.technicalTitle"
  // G1X specs sections
  | "g1x.specs.range.title"
  | "g1x.specs.range.summary"
  | "g1x.specs.range.combined"
  | "g1x.specs.powertrain.title"
  | "g1x.specs.powertrain.summary"
  | "g1x.specs.powertrain.motorDescription"
  | "g1x.specs.powertrain.controller"
  | "g1x.specs.powertrain.voltage"
  | "g1x.specs.license.title"
  | "g1x.specs.license.summary"
  | "g1x.specs.license.details"
  | "g1x.specs.batteries.title"
  | "g1x.specs.batteries.summary"
  | "g1x.specs.batteries.weight"
  | "g1x.specs.batteries.chemistry"
  | "g1x.specs.chassis.title"
  | "g1x.specs.chassis.summary"
  | "g1x.specs.chassis.rearSuspension"
  | "g1x.specs.chassis.frontWheelTravel"
  | "g1x.specs.chassis.rearWheelTravel"
  | "g1x.specs.chassis.frontBrakes"
  | "g1x.specs.chassis.rearBrakes"
  | "g1x.specs.chassis.frontTyre"
  | "g1x.specs.chassis.rearTyre"
  | "g1x.specs.chassis.frontWheel"
  | "g1x.specs.chassis.rearWheel"
  | "g1x.specs.dimensions.title"
  | "g1x.specs.dimensions.summary"
  | "g1x.specs.dimensions.seatHeight"
  | "g1x.specs.dimensions.rake"
  | "g1x.specs.dimensions.trail"
  | "g1x.specs.weight.title"
  | "g1x.specs.weight.summary"
  | "g1x.specs.weight.maxCarryingCapacity"
  | "g1x.specs.ridingModes.title"
  | "g1x.specs.ridingModes.summary"
  | "g1x.specs.ridingModes.city"
  | "g1x.specs.ridingModes.performance"
  | "g1x.specs.ridingModes.walk"
  | "g1x.specs.ridingModes.reverse"
  | "g1x.specs.performance.title"
  | "g1x.specs.performance.summary"
  | "g1x.specs.performance.topSpeedMax"
  | "g1x.specs.performance.topSpeedSustained"
  | "g1x.specs.performance.peakTorque"
  | "g1x.specs.performance.peakPower"
  | "g1x.specs.startingPrice.title"
  | "g1x.specs.startingPrice.summary"
  | "g1x.specs.warranty.title"
  | "g1x.specs.warranty.summary"
  | "g1x.specs.warranty.intro"
  | "g1x.specs.warranty.motorcycleYears"
  | "g1x.specs.warranty.powertrainYears"
  | "g1x.specs.warranty.coverage"
  | "g1x.specs.warranty.offroad"
  | "g1x.specs.warranty.linkText"
  | "g1x.specs.warranty.linkLabel"
  // G1X 360 stats labels
  | "g1x.stats.rangeLabel"
  | "g1x.stats.topSpeedLabel"
  | "g1x.stats.carryingCapacityLabel"
  | "g1x.stats.nominalPowerLabel"
  | "g1x.stats.peakPowerLabel"
  | "g1x.stats.removableBatteriesLabel"
  // G1X Hero
  | "g1x.hero.title"
  | "g1x.hero.subtitle"
  // G1X About
  | "g1x.about.header.line1"
  | "g1x.about.header.line2"
  | "g1x.about.header.line3"
  | "g1x.about.header.line4"
  | "g1x.about.description"
  // G1X Reserving
  | "g1x.reserving.title"
  | "g1x.reserving.subtitle"
  | "g1x.reserving.card1"
  | "g1x.reserving.card2"
  | "g1x.reserving.card3"
  // G1X CTA
  | "g1x.cta.title"
  | "g1x.cta.copy1.prefix"
  | "g1x.cta.copy1.suffix"
  | "g1x.cta.joinFounders"
  | "g1x.cta.price.regularLabel"
  | "g1x.cta.price.untilLabel"

  // Quality page
  | "quality.homologation.title"
  | "quality.homologation.p1"
  | "quality.qualityStandards.title"
  | "quality.qualityStandards.p1"
  | "quality.qualityStandards.p2"
  | "quality.qualityStandards.list.1"
  | "quality.qualityStandards.list.2"
  | "quality.qualityStandards.list.3"
  | "quality.qualityStandards.list.4"
  | "quality.qualityStandards.list.5"
  | "quality.qualityStandards.list.6"
  | "quality.customerService.title"
  | "quality.customerService.p1"
  | "quality.customerService.list.1"
  | "quality.customerService.list.2"
  | "quality.customerService.list.3"
  | "quality.customerService.list.4"
  | "quality.customerService.p2"
  | "quality.batteryReplacement.title"
  | "quality.batteryReplacement.p1"
  | "quality.batteryReplacement.p2"
  | "quality.batteryReplacement.list.1"
  | "quality.batteryReplacement.list.2"
  | "quality.batteryReplacement.p3"
  | "quality.batteryReplacement.list.3"
  | "quality.batteryReplacement.list.4"
  | "quality.batteryReplacement.list.5"
  | "quality.batteryReplacement.list.6"
  | "quality.batteryReplacement.list.7"
  | "quality.batteryReplacement.p4"
  | "quality.batteryReplacement.p5"
  | "quality.logistics.title"
  | "quality.logistics.p1"
  | "quality.logistics.p2"
  | "quality.logistics.list.1"
  | "quality.logistics.list.2"
  | "quality.logistics.list.3"
  | "quality.logistics.list.4"

  // Sustainability page
  | "sustainability.hero.title"
  | "sustainability.hero.p1"
  | "sustainability.intro.p1"
  | "sustainability.intro.p2"
  | "sustainability.list.iso14001.title"
  | "sustainability.list.iso14001.p1"
  | "sustainability.list.batterySustainability.title"
  | "sustainability.list.batterySustainability.p1"
  | "sustainability.list.digitalBatteryPassport.title"
  | "sustainability.list.digitalBatteryPassport.p1"
  | "sustainability.list.digitalDashboard.title"
  | "sustainability.list.digitalDashboard.p1"
  | "sustainability.list.digitalProductPassport.title"
  | "sustainability.list.digitalProductPassport.p1"
  | "sustainability.list.rightToRepair.title"
  | "sustainability.list.rightToRepair.p1"
  | "sustainability.list.elv.title"
  | "sustainability.list.elv.p1"
  | "sustainability.list.chemicals.title"
  | "sustainability.list.chemicals.p1"
  | "sustainability.list.packaging.title"
  | "sustainability.list.packaging.p1"
  | "sustainability.list.csddd.title"
  | "sustainability.list.csddd.p1"
  | "sustainability.list.energyEfficiency.title"
  | "sustainability.list.energyEfficiency.p1"
  | "sustainability.list.ghg.title"
  | "sustainability.list.ghg.p1"
  | "quality.hero.title"
  | "quality.hero.p1"
  // Warranty page - hero
  | "quality.warranty.hero.title"
  | "quality.warranty.hero.p1"
  // Warranty page - terms (short)
  | "quality.warranty.terms.cover.title"
  | "quality.warranty.terms.cover.p1"
  | "quality.warranty.terms.cover.list.1"
  | "quality.warranty.terms.cover.list.2"
  | "quality.warranty.terms.cover.list.3"
  | "quality.warranty.terms.cover.list.4"
  | "quality.warranty.terms.exclusions.title"
  | "quality.warranty.terms.exclusions.list.1"
  | "quality.warranty.terms.exclusions.list.2"
  | "quality.warranty.terms.exclusions.list.3"
  | "quality.warranty.terms.exclusions.list.4"
  | "quality.warranty.terms.exclusions.list.5"
  | "quality.warranty.terms.offroad.title"
  | "quality.warranty.terms.offroad.p1"
  | "quality.warranty.terms.responsibilities.title"
  | "quality.warranty.terms.responsibilities.list.1"
  | "quality.warranty.terms.responsibilities.list.2"
  | "quality.warranty.terms.responsibilities.list.3"
  | "quality.warranty.terms.responsibilities.list.4"
  | "quality.warranty.terms.data.title"
  | "quality.warranty.terms.data.p1"
  | "quality.warranty.terms.data.p2"
  | "quality.warranty.terms.transferable.title"
  | "quality.warranty.terms.transferable.p1"
  | "quality.warranty.terms.law.title"
  | "quality.warranty.terms.law.p1"
  // Warranty page - EU detailed
  | "quality.warrantyEU.title"
  | "quality.warrantyEU.s1.title"
  | "quality.warrantyEU.s1.list.1"
  | "quality.warrantyEU.s1.list.2"
  | "quality.warrantyEU.s1.list.3"
  | "quality.warrantyEU.s2.title"
  | "quality.warrantyEU.s2.p1"
  | "quality.warrantyEU.s3.title"
  | "quality.warrantyEU.s3.list.1"
  | "quality.warrantyEU.s3.list.2"
  | "quality.warrantyEU.s3.list.3"
  | "quality.warrantyEU.s4.title"
  | "quality.warrantyEU.s4.list.1"
  | "quality.warrantyEU.s4.list.2"
  | "quality.warrantyEU.s4.list.3"
  | "quality.warrantyEU.s4.list.4"
  | "quality.warrantyEU.s5.title"
  | "quality.warrantyEU.s5.list.1"
  | "quality.warrantyEU.s5.list.2"
  | "quality.warrantyEU.s5.list.3"
  | "quality.warrantyEU.s5.list.4"
  | "quality.warrantyEU.s6.title"
  | "quality.warrantyEU.s6.list.1"
  | "quality.warrantyEU.s6.list.2"
  | "quality.warrantyEU.s7.title"
  | "quality.warrantyEU.s7.p1"
  | "quality.warrantyEU.s8.title"
  | "quality.warrantyEU.s8.list.1"
  | "quality.warrantyEU.s8.list.2"
  | "quality.warrantyEU.s8.list.3"
  | "quality.warrantyEU.s8.list.4"
  | "quality.warrantyEU.s9.title"
  | "quality.warrantyEU.s9.list.1"
  | "quality.warrantyEU.s9.list.2"
  | "quality.warrantyEU.s9.list.3"
  | "quality.warrantyEU.s9.list.4"
  | "quality.warrantyEU.s10.title"
  | "quality.warrantyEU.s10.p1"
  | "quality.warrantyEU.s10.p2"
  | "quality.warrantyEU.s11.title"
  | "quality.warrantyEU.s11.p1"
  | "quality.warrantyEU.s12.title"
  | "quality.warrantyEU.s12.p1";

// Define translation dictionary type
type TranslationDict = {
  [key in TranslationKey]: string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English and Italian translations
const translations: Record<Language, TranslationDict> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.bikes": "Motorcycles",
    "nav.g1series": "G1 Series",
    "nav.about": "About Us",
    "nav.news": "News",
    "nav.corporate": "Corporate",
    "nav.contact": "Contact",
    "nav.tech": "Tech",
    "nav.foundersCircle": "Founder’s Circle",
    "nav.quality": "Quality",
    "nav.events": "Events",
    "nav.sustainability": "Sustainability",

    // French translations will be added in the future
    // 'nav.home': 'Accueil',
    // 'nav.bikes': 'Motos',

    // Hero section
    "hero.title": "GR1T",
    "hero.subtitle": "Electric Motorcycles",
    "hero.description":
      "Powerful, sophisticated machines that fulfill the role of transport while remaining fun and exciting to ride.",

    // Corporate section
    "corporate.mission": "Our Mission",
    "corporate.vision": "Our Vision",
    "corporate.values": "Our Values",
    "corporate.schedule": "Schedule",
    "corporate.info": "Corporate",
    "corporate.title": "Corporate",
    "corporate.description":
      "We are an electric motorcycle startup dedicated to the development of innovative mobility solutions for a net zero economy.",
    "corporate.overview.part1":
      "We are an electric motorcycle startup dedicated to the development of innovative mobility solutions for a net zero economy. Our motorcycles are designed to be powerful, sophisticated machines that fulfil the role of transport while remaining fun and exciting to ride.",
    "corporate.overview.part2":
      "Our current electric motorcycle is an urban/suburban commuter with a range of 150 km, a payload of 190 kgs, and a top speed of 135 km/hr, all with a weight of 120 kgs. The GR1T G1S and G1X styling and design have been developed  combining functionality, performance and elegance. These are motorcycles that people love to ride.",
    "corporate.development.title": "Development",
    "corporate.development.description":
      "Our development process focuses on creating electric motorcycles that combine performance, sustainability, and style.",
    "corporate.schedule.title": "Our development schedule includes:",
    "corporate.distributors.link": "Become a Distributor",
    "corporate.investors.link": "Become an Investor",
    "corporate.fleetSales.link": "Fleet Sales",
    "corporate.fleetSales.title": "Fleet Sales",
    "corporate.fleetSales.description":
      "GR1T plans to launch sales of our electric motorcycle in January 2027. We are seeking distributors in the following countries. We plan to expand in stages subject to cash flow and sales constraints.",
    // Corporate subpages - Fleet Sales (EN)
    "fleetSales.headerTitle": "Defense, Civil & Fleet Sales",
    "fleetSales.headerDescription":
      "With a range of 150 km and a best-in-class payload of 190 kgs, our electric motorcycle is optimally positioned for fleet sales and last-mile delivery solutions. Some of the fleet sales applications we are open to planning include:",
    "fleetSales.items.military.title": "Military, Police & Civil Protection",
    "fleetSales.items.military.description":
      "We are ready to work with qualified military, police and civil protection authorities (such as fire departments, forest rangers, border guards, etc.) to develop extended-range, silent motorcycles with a 190 kgs payload and a longer range.",
    "fleetSales.items.rentals.title": "Motorcycle Rentals / Tourist Rentals",
    "fleetSales.items.rentals.description":
      "Our electric motorcycle is optimally-suited as the vehicle of choice for historical capitals, islands, marinas, and other areas which want an environmentally-sustainable vehicle which is also silent and does not disturb nature, wildlife, guests or residents with noise and pollution.",
    "fleetSales.items.resorts.title": "Hotel Resorts, Marinas, Golf Courses",
    "fleetSales.items.resorts.description":
      "Large hotel resorts which include marinas, golf courses, ski trails and other amenities benefit from a powerful motorcycle for staff, deliveries and other support roles which has zero noise and carbon pollution.",
    "fleetSales.items.natureParks.title": "Nature Reserves, National Parks, Safari Parks",
    "fleetSales.items.natureParks.description":
      "Our electric motorcycle provides silent transport for game wardens or staff in nature reserves, safari parks or other environmentally-protected areas. We can arrange solar powered charging stations at suitable locations to assure range issues and power reserves.",
    "fleetSales.items.postCourier.title": "Post & Courier Companies",
    "fleetSales.items.postCourier.description":
      "If you are a post and courier company and would like to use our electric motorcycle for mail, parcel and other deliveries, we offer a 190 kg payload with innovative branding solutions, including the rear topbox and sidesaddles.",
    "fleetSales.items.foodDelivery.title": "Food Delivery Companies",
    "fleetSales.items.foodDelivery.description":
      "If you would like to switch over to a powerful yet versatile electric motorcycle for food deliveries, our model has a range of 150 km per 2-battery charge and a best-in-class payload of 190 kgs.",

    // Founders Circle page (EN)
    "founders.title": "GR1T Founder’s Circle",
    "founders.discountCta": "Get a €1,500 discount if you reserve by 31.1.2026",
    "founders.reserving.intro.bold": "By placing a €100 fully refundable reservation,",
    "founders.reserving.intro.p1":
      "you’ll secure priority access to our first production run and unlock an exclusive €1,500 discount on our launch model. This offer is limited and valid only for reservations made before 31 January 2026. Joining the Founder’s Circle means you’ll be the first to configure your bike, receive insider updates, and claim your place in GR1T’s future.",
    "founders.reserving.simpleTitle": "Reserving is Simple",
    "founders.reserving.simpleCopy":
      "If we don’t go to production, or you change your mind, you’ll be refunded in full. No risk, no fine print.",
    "founders.cards.reserve.line1": "Reserve today with a",
    "founders.cards.reserve.line2": "fully refundable €100.",
    "founders.cards.customize.line1": "Customize your Motorcycle",
    "founders.cards.customize.line2": "when production begins.",
    "founders.cards.order.line1": "Order by January 31st",
    "founders.cards.order.line2": "and get priority shipping",
    "founders.bikes.g1s.title": "GR1T G1S",
    "founders.bikes.g1s.description": "A cutting-edge urban commuter that fuses agility, elegance, and real-world utility.",
    "founders.bikes.g1s.startingPrice": "From €7,000 + VAT",
    "founders.bikes.discountBadge.g1s": "€1,500 off original list price of €7,000 if you reserve by 31.1.2026",
    "founders.bikes.discountBadge.g1x": "€1,500 off original list price of €8,000 if you reserve by 31.1.2026",
    "founders.bikes.footnote": "*if you reserve by 31.1.2026",
    "founders.bikes.reserveButton": "Reserve for €100",
    "founders.bikes.g1x.title": "GR1T G1X",
    "founders.bikes.g1x.description": "A versatile scrambler built for urban streets and weekend adventures.",
    "founders.bikes.g1x.startingPrice": "From €8,000 + VAT",
    "founders.faq.title": "Founder’s Circle FAQs",
    "founders.terms.linkText": "Terms and Conditions.",

    // Founders FAQ (EN)
    "founders.faq.q.what": "What is the GR1T Founder's Circle?",
    "founders.faq.a.what.p1":
      "A limited-time opportunity to support GR1T and receive a €1,500 discount on the normal starting MSRP of the selected model.",
    "founders.faq.a.what.list.1": "G1S ‘Street’: MSRP €7,000 + VAT — Founder’s Circle starting price: €5,500 + VAT",
    "founders.faq.a.what.list.2": "G1X ‘Scrambler’: MSRP €8,000 + VAT — Founder’s Circle starting price: €6,500 + VAT",
    "founders.faq.a.what.terms": "Full terms of the Founder’s Circle offer can be found here.",
    "founders.faq.q.claimDiscount": "How do I claim the €1,500 discount?",
    "founders.faq.a.claimDiscount.p1": "When reservations open, you’ll place a €100 refundable deposit to lock in your discount.",
    "founders.faq.q.expire": "When does this offer expire?",
    "founders.faq.a.expire.p1": "The Founder’s Circle offer ends on January 31, 2026.",
    "founders.faq.q.depositRisk": "Are the deposits at risk?",
    "founders.faq.a.depositRisk.p1":
      "No. All deposits are paid into a separate account that we will not touch. Your deposit is refundable at any time should you change your mind.",
    "founders.faq.q.reservationBinding": "Is the reservation fee binding?",
    "founders.faq.a.reservationBinding.p1": "No. The €100 deposit is fully refundable with no obligation to purchase.",
    "founders.faq.q.afterReserve": "What happens after I reserve?",
    "founders.faq.a.afterReserve.p1":
      "We’ll inform you once we’re ready to produce your bike. You’ll receive configuration options, delivery updates, and priority service.",
    "founders.faq.q.deliveriesStart": "When will deliveries start?",
    "founders.faq.a.deliveriesStart.p1": "We expect first deliveries in early 2027 after production funding is confirmed.",
    "founders.faq.q.transferDiscount": "Can I transfer the discount to someone else?",
    "founders.faq.a.transferDiscount.p1": "No. The discount is personal and tied to your signup details.",
    "founders.faq.q.availability": "Will the motorcycle be available in my country?",
    "founders.faq.a.availability.p1":
      "We will ship anywhere in the world, launching first in key European markets. The bike might not be homologated for your country initially. When you sign up, we ask for your country of residence to plan delivery and availability. We’ll keep you informed as we expand markets.",
    "founders.faq.q.specChanges": "What if specifications change?",
    "founders.faq.a.specChanges.p1":
      "Minor changes may occur as we refine the design, but the bike will stay true to the performance and design shown here.",

    // Corporate subpages - Conferences
    "corporate.conferences.title": "Conferences & Events",
    "corporate.conferences.description":
      "Each year we participate in a wide range of events and conferences. Our current list is seen below: updates are made regularly throughout the year. Please feel free to contact us to arrange a visit or meeting at one of these events.",
    "conferences.events.sifted.title": "Sifted Summit — London, England — 8–9 October 2025",
    "conferences.events.sifted.p1":
      "Join 3,000 founders, startup and scaleup operators and investors to celebrate the resilience of the ecosystem and how its leading players are preparing for the long-haul. Held at Magazine London in North Greenwich — we look forward to seeing you.",
    "conferences.events.sifted.p2": "",
    "conferences.events.sifted.linkText": "Sifted Summit",
    "conferences.events.sifted.linkUrl": "https://summit.sifted.eu/",
    "conferences.events.sifted.link": "https://summit.sifted.eu/",
    "conferences.events.sevenstar.title": "Seven Star Award — Lisbon, Portugal — 11 October 2025",
    "conferences.events.sevenstar.p1":
      "Renowned as the premier authority in luxury recognition, the awards serve as a beacon for discerning travelers and lifestyle enthusiasts worldwide. With a unique blend of data-driven insights and original content, the organization has established itself as a trusted voice among the elite audience it serves.",
    "conferences.events.k2match.title": "K2 Match Investor Summit — Monaco — 16–17 October 2025",
    "conferences.events.k2match.p1":
      "K2MATCH provides a professional international curated entrepreneurial ecosystem for Startups and ScaleUps. We match Startups with Investors, Corporates, Business Communities, Expert Solution Partners and provide world-class growth solutions and services for entrepreneurs and business leaders.",
    "conferences.events.k2match.link": "https://www.k2match.com/",
    "conferences.events.eicma.title": "EICMA 2025 — Milan, Italy — 4–9 November 2025",
    "conferences.events.eicma.p1":
      "The International Two-Wheeler Exhibition, at the world level, is the most important trade fair event for the entire 2-wheel sector and represents the marketing tool of ANCMA, the Confindustria Industrial Association of which the most prestigious companies in the industry.",
    "conferences.events.eicma.link": "https://www.eicma.it/en/",
    "conferences.events.websummit.title": "Web Summit — Lisbon, Portugal — 10–13 November 2025",
    "conferences.events.websummit.p1":
      "Web Summit was founded in Dublin in 2009 by Paddy Cosgrave. It started as a 150-person tech conference in October 2009. Since 2009, Web Summit has gathered together over a million business people from around the world.",
    "conferences.events.websummit.link": "https://websummit.com/",

    // Corporate subpages - Distributors
    "corporate.distributors.title": "Distributors",
    "corporate.distributors.description":
      "GR1T plans to launch sales of our electric motorcycle in January 2027. We are seeking distributors in the following countries. We plan to expand in stages subject to cash flow and sales constraints.",
    "distributors.offer.title": "If you are interested in becoming a GR1T distributor, we can offer you:",
    "distributors.offer.item1": "Highly attractive commercial terms on motorcycle sales",
    "distributors.offer.item2":
      "Excellent warranty terms for consumers, with a corresponding stock of motorcycles, batteries and merchandise",
    "distributors.offer.item3": "Crystal-clear maintenance and technical support contracts",
    "distributors.offer.item4":
      "Access to our web-based ordering and CRM system enabling seamless ownership and management of retail customers: your customers remain your customers.",
    "distributors.offer.item5": "Extensive sales training and technical support",
    "distributors.offer.item6": "In-store / In-system events and BTL events",
    "distributors.expect.title": "In exchange, we expect:",
    "distributors.expect.item1": "Strong commitment to GR1T values, technology and initiatives",
    "distributors.expect.item2": "Creative, dynamic and consistent sales effort",
    "distributors.expect.item3": "Strong customer support at all times",
    "distributors.expect.item4": "Your support for product and service design and continual development",
    "distributors.countries.paragraph":
      "We are seeking national and regional distributors in the following countries, with launch expected between 2027 – 2029. The launch date will depend on completion on funding, joint sales planning and other activities.",
    "distributors.priority1": "Priority 1",
    "distributors.priority2": "Priority 2",
    "distributors.priority3": "Priority 3",
    "distributors.priority4": "Priority 4",
    "distributors.priority1.countries": "Italy / Greece",
    "distributors.priority2.countries": "France / Spain",
    "distributors.priority3.countries": "Germany / Portugal",
    "distributors.priority4.countries": "Other countries",

    // Corporate subpages - Investors
    "corporate.investors.title": "Investors",
    "corporate.investors.description":
      "GR1T is currently implementing its seed round. We are raising € 5.5 million which will be used for launching the second round of testing of our GR1T prototype, setting up our production, and launching production in January 2027. A brief summary of our fundraising round is included here.",
    "investors.items.raise.title": "Investment Raise",
    "investors.items.raise.value": "EUR 7 million",
    "investors.items.representation.title": "Representation",
    "investors.items.representation.value": "1 Board of Directors seat",
    "investors.items.return.title": "Investor Return",
    "investors.items.return.value": "x50",
    "investors.items.closing.title": "Closing",
    "investors.items.closing.value": "31 January 2026",
    "investors.items.capTable.title": "Current Cap Table",
    "investors.items.capTable.item1": "Shareholder 1: 33.33%",
    "investors.items.capTable.item2": "Shareholder 2: 33.33%",
    "investors.items.capTable.item3": "Shareholder 3: 33.33%",
    "investors.useOfFunds.title": "Use Of Funds",
    "investors.useOfFunds.amount": "Amount (€)",
    "investors.useOfFunds.factoryRenovation": "Factory Renovation",
    "investors.useOfFunds.factoryEquipment": "Factory Equipment",
    "investors.useOfFunds.moulds": "Moulds & Tooling",
    "investors.useOfFunds.additionalRD": "Additional R&D",
    "investors.useOfFunds.market1": "Market 1 rollout",
    "investors.useOfFunds.market2": "Market 2 rollout",
    "investors.useOfFunds.productionCapital": "Production capital",
    "investors.useOfFunds.productionStaff": "Production staff",
    "investors.useOfFunds.utilities": "Utilities and operation",
    "investors.useOfFunds.total": "Total",
    "investors.contact": "For further information and to request our pitch deck, please contact us at",
    "investors.contact.email": "invest(at)gritmotorcycles.com",

    // Corporate subpages - Work With Us
    "corporate.work.title": "Work With Us",
    "corporate.work.description":
      "GR1T Motorcycles is a startup in launch mode. This page provides information on our procurement opportunities. All procurement is handled professionally based on international best practise, at arms length, and is evaluated by the responsible members of our management team.",
    "work.procurement.title": "Procurement",
    "work.procurement.website": "Corporate Website Development",
    "work.procurement.branding": "Corporate Branding Consultancy Support",
    "work.procurement.website.deadline": "31 July 2025",
    "work.procurement.branding.deadline": "31 July 2025",
    "work.status.closed": "Closed",
    "work.status.openContingent": "Open, contingent on funding",
    "work.deadline": "DEADLINE:",
    "work.recruitment.title": "Recruitment",
    "work.recruitment.qualityManager": "Quality Manager",
    "work.recruitment.productionManager": "Production Manager",
    "work.recruitment.eicmaTemp": "EICMA Temporary Staff",
    "work.recruitment.eicmaTemp.deadline": "1 September 2025",

    // Schedule
    "schedule.summer2025": "Summer 2025",
    "schedule.fall2025": "Fall 2025",
    "schedule.eicma2025": "EICMA 2025",
    "schedule.winter2025": "Winter 2025",
    "schedule.spring2026": "Spring 2026",
    "schedule.summer2026": "Summer 2026",
    "schedule.fall2026": "Fall 2026",
    "schedule.january2027": "January 2027",
    "schedule.roadTesting": "Road Testing",
    "schedule.investorPresentations": "Investor Presentations",
    "schedule.formalLaunch": "Formal Launch",
    "schedule.furtherTesting": "Further Testing",
    "schedule.designFinalization": "Design Finalization",
    "schedule.factoryDevelopment": "Factory Development",
    "schedule.preOrders": "Pre-Orders",
    "schedule.salesLaunch": "Sales Launch",
    "schedule.detailedInfo": "Detailed information about",
    "schedule.additionalPlans": "Additional plans will be announced as we progress through our development roadmap.",

    // Values
    "values.emotion": "Emotion",
    "values.innovation": "Innovation",
    "values.sustainability": "Sustainability",
    "values.integrity": "Integrity",
    "values.independence": "Independence",
    "values.emotion.description": "We create motorcycles that evoke passion and excitement in every ride.",
    "values.innovation.description": "We constantly push boundaries with cutting-edge technology and design.",
    "values.sustainability.description": "We are committed to environmentally responsible manufacturing and operations.",
    "values.integrity.description": "We conduct business with honesty, transparency, and ethical standards.",
    "values.independence.description": "We maintain creative freedom to pursue our vision without compromise.",

    // Mission & Vision
    "mission.title": "Our Mission",
    "mission.description":
      "Our mission is simple: to redefine urban mobility with machines built for freedom and individuality.\n\nWe craft all-electric motorcycles that solve real mobility issues without losing the thrill, raw performance, or sharp design that make riding worth it. We're here to redefine what mobility looks like—high-performance machines built with purpose, engineered for the future, and rooted in sustainability from the ground up.",
    "vision.title": "Our Vision",
    "vision.description":
      "GR1T is shaping the future of motorcycling—electric, elegant, and built to perform. Designed in Italy and made in Europe, every model is crafted for riders who value style, substance, and sustainability.\n\nWe're building motorcycles that fit real lives: commuting during the week, escaping on weekends, or handling the demands of last-mile delivery. From battery design to recyclability, every detail is engineered for performance, longevity, and a lighter footprint.\n\nBy 2030, our lineup will include four models, each one ready for the road ahead—meeting the 2035 ICE phase-out and supporting the EU's 2050 Net Zero vision. We're not adapting to change. We're creating it.\n\nEach comes in a standard two-battery setup or an extended-range XR version. As technology evolves, so does our performance—bringing electric ever closer to parity with combustion.\n\nSustainability is built into everything we do. From clean manufacturing to battery recycling and circular design principles, our entire value chain reflects our commitment to a better future.\n\nWe also believe in doing business the right way—growing through constant improvement and treating every partner and team member with fairness and respect.\n\nThis is GR1T. Electric motorcycles made for what's next.",

    // Home page
    "home.craft.title": "Learn more about our craft",
    "home.craft.description": "Discover the passion, precision, and innovation behind every GR1T motorcycle.",
    "home.craft.button": "Read More",
    "home.tagline": "The urban explorer for a new generation.",
    "home.news.title": "Latest News",
    "home.news.description": "Stay updated with the latest developments and announcements from GR1T Motorcycles.",
    "home.specs.batteries": "removable batteries",
    "home.specs.weight": "weight",
    "home.specs.range": "range",
    "home.specs.topSpeed": "top speed",
    "home.specs.capacity": "carrying capacity",
    "home.specs.power": "peak power",
    "home.bikes.title": "The G1 Series. Different journeys, same DNA.",
    "home.bikes.description1": "A cutting-edge fusion of agility, elegance, and performance for the city.",
    "home.bikes.description2": "For the rider that seeks adventure beyond the urban jungle.",
    "home.bikes.g1s.startingPrice": "From €7,000 + VAT",
    "home.bikes.g1s.originalStartingPrice": "€7,000 + VAT",
    "home.bikes.g1x.startingPrice": "From €8,000 + VAT",
    "home.bikes.g1x.originalStartingPrice": "€8,000 + VAT",
    "home.bikes.discountInline.prefix": "Reserve for €100",
    "home.bikes.discountInline.suffix": "fully refundable. Secure your build slot.",
    "home.gallery.title": "Urban Freedom Without Compromise.",
    "home.gallery.description":
      "Designed in Italy and made in Europe with the future in mind, the GR1T Series combines power, style and functionality for a superior riding experience.",
    "home.follow.title": "Follow us",
    "home.gallery.overlay.line1": "Precision.",
    "home.gallery.overlay.line2": "Premium.",
    "home.gallery.overlay.line3": "Performance.",
    "home.gallery.overlay.text":
      "The GR1T G1 combines precision engineering, durability, security, and utility in one uncompromising machine.",
    "home.gallery.card.smartTech.title": "Smart Tech",
    "home.gallery.card.smartTech.description": "4G, keyless unlock, wireless charging, GR1T app.",
    "home.gallery.card.utility.title": "Utility",
    "home.gallery.card.utility.description": "Storage, racks, and swappable batteries for daily use.",
    "home.gallery.card.materials.title": "Premium Materials",
    "home.gallery.card.materials.description": "Lightweight alloys and refined finishes built to last.",
    "home.gallery.card.security.title": "Security",
    "home.gallery.card.security.description": "Cameras, Wake-On-Shake, GPS, and remote lock for protection.",
    "cta.refundableLine": "100% refundable. Risk free.",
    "cta.faqLabel": "FAQ.",
    "cta.termsLabel": "Terms.",
    "cta.andConnector": "&",
    "home.faq.title": "FAQs",
    "home.faq.subtitle": "Questions? We've got answers!",
    "home.faq.visitG1S": "Visit G1S Street Specs",
    "home.faq.visitG1X": "Visit G1X Scrambler Specs",
    "home.faq.licenseLabel": "license",
    "home.specs.battery": "battery",
    "home.specs.charging": "charging",
    "home.specs.payload": "payload",
    "checkout.breadcrumb": "Cart > Payment & financing",
    "checkout.orderSummary.title": "Order summary",
    "checkout.payment.title": "Payment",
    "checkout.payment.description":
      "Secure on-page payment with Stripe — pay by card, Apple Pay, Google Pay, Klarna, Revolut Pay, or Twint (availability depends on your region and Stripe settings).",
    "checkout.express.title": "Express Checkout",
    "checkout.personal.title": "Personal details",
    "checkout.card.title": "Card details",
    "checkout.badge.card": "CARD",
    "checkout.badge.wallet": "Apple Pay",
    "checkout.placeholder.email": "Email address",
    "checkout.placeholder.phone": "Phone number",
    "checkout.placeholder.company": "Company Name",
    "checkout.placeholder.country": "Select country",
    "checkout.placeholder.tshirt": "T‑shirt size",
    "checkout.placeholder.address1": "Address 1",
    "checkout.placeholder.address2": "Address 2",
    "checkout.placeholder.firstName": "Name",
    "checkout.placeholder.lastName": "Surname",
    "checkout.placeholder.city": "City",
    "checkout.summary.estimateLabel": "(est. purchase price)",
    "checkout.summary.dueToday": "Due Today",
    "checkout.summary.reservationLabel": "Reservation",
    "checkout.newsletter.label": "Subscribe to our newsletter",
    "checkout.agree.prefix": "I agree to the",
    "checkout.placeOrder": "Place order",
    "checkout.legal.note":
      "By placing a fully refundable reservation, you agree to the Privacy Policy and Commercial Terms of Use. A refundable deposit does not guarantee a specific delivery date and is subject to change. The final price of the product can vary.",
    "home.faq.cost.g1s": "G1S “Street”: From €7,000 + VAT with a €100 refundable reservation by 31.1.2026.",
    "home.faq.cost.g1s.list": "G1S “Street” From €7,000 + VAT",
    "home.faq.cost.g1x.list": "G1X “Scrambler” From €8,000 + VAT",
    "home.faq.cost.g1x": "G1X “Scrambler”: From €6,500 + VAT with a €100 refundable reservation by 31.1.2026.",

    // FAQ question titles
    "home.faq.q.keySpecs": "What are the key specifications?",
    "home.faq.q.range": "What is the range?",
    "home.faq.q.cost": "How much do the bikes cost?",
    "home.faq.q.license": "What license do I need to ride it?",
    "home.faq.q.removableBatteries": "Can I remove the batteries for charging?",
    "home.faq.q.chargeTime": "How long does it take to charge?",
    "home.faq.q.carCharging": "Can I charge it from a car charging point?",
    "home.faq.q.motorway": "Can I ride it on the motorway?",
    "home.faq.q.twoRiders": "Is it suitable for two riders?",
    "home.faq.q.difference": "What makes this bike different from others?",
    "home.faq.q.theftResistant": "Is it theft-resistant?",
    "home.faq.q.tyresWheels": "What tyres and wheels are used?",
    "home.faq.q.seeOrTest": "Where can I see or test it?",
    "home.faq.q.appLaunch": "Will the GR1T App be available at launch?",
    "home.faq.q.warranty": "What warranty does GR1T offer?",
    "home.faq.q.euHomologation": "Is the bike homologated for EU roads?",
    "home.faq.q.versions": "Is the bike available in different versions?",
    "home.faq.q.colorsConfigs": "What colours and configurations are available?",
    "home.faq.q.order": "How can I order?",
    "home.faq.q.reservationProcess": "How does the reservation process work?",
    "home.faq.q.deliveriesStart": "When will deliveries start?",
    "home.faq.q.outsideEU": "What if I live outside the EU?",
    "home.faq.q.financing": "Is financing available?",
    // FAQ answers (EN)
    "home.faq.a.keySpecs.list.topSpeed": "Top speed: 130 km/h",
    "home.faq.a.keySpecs.list.range": "Range: Up to 150 km",
    "home.faq.a.keySpecs.list.battery": "Battery: Removable dual-battery system (6.0 kWh standard)",
    "home.faq.a.keySpecs.list.charging": "Charging: 2.5 hrs to 80%, 3.2 hrs to 100%",
    "home.faq.a.keySpecs.list.power": "Power: 11 kW nominal (125cc), 27 kW peak (36 hp)",
    "home.faq.a.keySpecs.list.weight": "Weight: 127 kg (incl. batteries)",
    "home.faq.a.keySpecs.list.payload": "Payload: 190 kg",
    "home.faq.a.keySpecs.list.license": "License: A1 or B (in some countries)",
    "home.faq.a.range.p1":
      "Depending on battery config, riding style, and terrain, the G1 offers a practical 120–150 km of real-world range (WMTC). Ideal for commuting, suburban travel, and weekend trips.",
    "home.faq.a.cost.list.g1s": 'G1S "Street" expected MSRP is €7,000 + VAT.',
    "home.faq.a.cost.list.g1x": 'G1X "Scrambler" expected MSRP is €8,000 + VAT.',
    "home.faq.a.cost.promo.p1": "Founder’s Circle members get a €1,500 discount on reservations made by 31.1.2026.",
    "home.faq.a.cost.expectedTitle": "The expected list prices are:",
    "home.faq.a.cost.expected.g1s": "G1S “Street”: from €7,000 + VAT",
    "home.faq.a.cost.expected.g1x": "G1X “Scrambler”: from €8,000 + VAT",
    "home.faq.a.cost.discountIntro":
      "With a €100 refundable reservation placed by 31.1.2026, you receive a €1,500 discount, bringing the starting prices to:",
    "home.faq.a.cost.discount.g1s": "G1S: from €5,500 + VAT",
    "home.faq.a.cost.discount.g1x": "G1X: from €6,500 + VAT",
    "home.faq.a.cost.finalNote": "Final pricing may vary based on selected options and configuration.",
    "home.faq.a.cost.linkText": "Explore the Founder’s Circle privileges →",
    "home.faq.a.license.p1": "You’ll need an A1 license or a B license in some countries. Please check local laws.",
    "home.faq.a.removableBatteries.p1":
      "Yes. Two removable batteries allow flexible charging at home, work, or anywhere with a standard outlet.",
    "home.faq.a.removableBatteries.list.6kwh": "2 × 3.0 kWh packs for a total of 6.0 kWh",
    "home.faq.a.chargeTime.p1": "Charging times depend on battery configuration and power source. ~3.2 hours at 220V.",
    "home.faq.a.chargeTime.fastTopUp": "A fast top‑up from 10–80% typically takes 1.5–2.5 hours depending on pack size.",
    "home.faq.a.carCharging.p1":
      "Yes. With the optional Type 2 adapter and on-board charger, you can plug the G1 into any standard car charging station.",
    "home.faq.a.motorway.p1":
      "Yes. With a top speed of 135 km/h, the G1 is motorway-capable and suited for urban and suburban roads.",
    "home.faq.a.twoRiders.p1": "Yes. The G1 is a standard two-seater with best-in-class payload capacity (up to 190 kg).",
    "home.faq.a.difference.list.1": "Designed and engineered in Italy’s Motor Valley",
    "home.faq.a.difference.list.2": "Premium materials",
    "home.faq.a.difference.list.3": "Removable dual-battery system",
    "home.faq.a.difference.list.4": "190 kg carrying capacity",
    "home.faq.a.difference.list.5": "9L under-seat storage",
    "home.faq.a.difference.list.6":
      "Smart tech (4G dashboard, wireless CarPlay/Android Auto, wireless charging, GPS, rider-facing camera)",
    "home.faq.a.difference.list.7": "Sleek, customizable design",
    "home.faq.a.theftResistant.p1":
      "Yes – GPS tracking, rider-facing motion camera, remote lock, and removable batteries make theft extremely difficult.",
    "home.faq.a.tyresWheels.intro": '17" wheels.',
    "home.faq.a.tyresWheels.g1s": "G1S: Pirelli Angel City.",
    "home.faq.a.tyresWheels.g1x": "G1X: Metzeler Karoo Street.",
    "home.faq.a.tyres.frontLabel": "Front",
    "home.faq.a.tyres.rearLabel": "Rear",
    "home.faq.a.seeOrTest.p1": "We’ll be at EICMA in Milan (Hall 9, Stand S57).",
    "home.faq.a.seeOrTest.p2": "Checkout our social media account for more regular updates.",
    "home.faq.a.appLaunch.p1": "Yes – digital key, GPS tracking, diagnostics, OTA updates, and more.",
    "home.faq.a.warranty.list.1": "⁠2 years on the full motorcycle (unlimited km)",
    "home.faq.a.warranty.list.2": "3 years or 36,000 km on powertrain",
    "home.faq.a.warranty.list.3": "6 years on batteries (≥ 80% capacity guaranteed)",
    "home.faq.a.euHomologation.p1": "Yes, developed in full compliance with EU homologation standards.",
    "home.faq.a.versions.p1": "Yes – a Street model and a Scrambler model.",
    "home.faq.a.colorsConfigs.p1": "Several customizable side panel options and accessory packs will be available.",
    "home.faq.a.order.p1": "Click here to reserve",
    "home.faq.a.reservationProcess.p1": "Go to our reservation page, select your model and pay a €100 deposit.",
    "home.faq.a.deliveriesStart.p1":
      "We aim to begin production in 2026, with deliveries starting in 2027 after production funding is confirmed.",
    "home.faq.a.outsideEU.p1": "We plan to launch in key European markets first. We’ll expand market-by-market.",
    "home.faq.a.financing.p1": "We are working with partners to offer financing options in select countries.",

    // Bikes
    "bikes.price": "$1200",
    "bikes.darkKnight": "Dark Knight",
    "bikes.streetMoto": "Street Moto",

    // About us
    "about.title": "About Us",
    "about.description":
      "GR1T was founded on the belief that electric motorcycles can be powerful, stylish, and thrilling. Pushing boundaries and opening new terrains of tomorrow.",
    "about.story.title": "Our Story",
    "about.story.part1":
      "What began as a conversation between lifelong friends and entrepreneurs has evolved into a European electric motorcycle company with a clear mission: to create purpose-built, high-performance, and beautifully engineered electric motorcycles for the cities of tomorrow.\n\nWe've built more than a bike — we've built a platform.\n\nOur motorcycles are not adapted from existing frames or forced into legacy molds. They're designed from the ground up with urban and suburban riders in mind. Featuring advanced digital connectivity, modular components, and premium styling, each GR1T motorcycle reflects our obsession with quality, detail, and ride experience.",
    "about.story.part2":
      "At the heart of it all is GR1T — the mindset, not just the name.\n\nWe believe mobility should be exciting, responsible, and expressive. Our riders don't follow the herd — they choose their line, carve their path, and ride with purpose. That's why we've designed GR1T motorcycles to be customizable, serviceable, and future-ready.",
    "about.story.tagline": "Ride GR1T.",
    "about.founders.title": "Meet Our Founders",
    "about.founders.background": "Background",
    "about.founders.omar.background":
      "Trapped in banking and wealth management for 25 years, Omar is a former basketball player and currently a youth basketball coach. He is also the irritating glue holding us all together. ",
    "about.founders.philip.background":
      "An avid motorcycle rider, Philip joined GR1T to handle finance and business model operations. He’s responsible for making sure we stay frugal while keeping the lights on.",
    "about.founders.jamal.background":
      "Jamal took one look at the GR1T story and knew he had to support the project. A former trader and an active investor, he is our senior presence and guiding light.",

    // Contact
    "contact.title": "Contact us",
    "contact.description":
      "Whether you're a rider, investor, or partner, we're here to talk. Send us a message and our team will get back to you as soon as possible.",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.form.firstName": "First name",
    "contact.form.lastName": "Last Name",
    "contact.form.sending": "Sending...",
    "contact.form.send": "Send",
    "contact.workTogether": "Let's Work Together",
    "contact.generalEnquiries": "General Enquiries",
    "contact.pressEnquiries": "Press Enquiries",
    "contact.pressDescription":
      "We welcome all qualified press inquiries. To learn more about GR1T, our values and our journey, please contact us.",
    "contact.socialMedia": "Social Media",
    "contact.successMessage": "Thank you! Your message has been sent successfully.",
    "contact.errorMessage": "There was a problem sending your message. Please try again.",
    "contact.getInTouch": "Get in Touch!",

    // News
    "news.title": "All News",
    "news.description": "Stay updated with the latest developments, announcements, and stories from GR1T Motorcycles.",
    "news.readMore": "Read More",
    "news.backToNews": "← Back to News",
    "news.loading": "Loading article...",
    "news.notFound": "Article not found.",
    "news.views": "views",
    "news.comments": "comments",
    "news.by": "By",

    // Footer
    "footer.rights": "All Rights Reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.legal": "Legal",
    "footer.workWithUs": "Work With Us",
    "footer.warranty": "Warranty",
    "footer.reservationTerms": "Reservation Terms",
    "footer.newsletter.title": "Keep in touch",
    "footer.newsletter.description": "Join our newsletter and become an Inner Circle member today!",
    "footer.newsletter.joinNow": "Join now!",
    "footer.newsletter.success": "Subscribed successfully. Please check your inbox.",
    "footer.newsletter.networkError": "Network error. Please try again.",

    // Language toggle
    language: "Language",
    "language.english": "English",
    "language.italian": "Italiano",

    // Common
    "common.readMore": "Read More",
    "common.getInTouch": "Get in Touch",
    "common.loading": "Loading...",
    "common.error": "An error occurred. Please try again.",
    "common.reserveNow": "Reserve Now",
    "common.explore": "Explore",
    "common.privacyPolicy": "Privacy Policy",
    "common.termsOfUse": "Terms of Use",

    // CTA page
    "cta.hero.title": "Sign up for our Newsletter",
    "cta.hero.subtitle": "Stay up to date with product launches and special offers.",
    "cta.hero.button": "Signup",
    "cta.modal.title": "Join our Newsletter",
    "cta.modal.subtitle": "Stay up to date with product launches and special offers.",
    "cta.form.namePlaceholder": "Your name",
    "cta.form.countryPlaceholder": "Select country...",
    "cta.form.noResults": "No results",
    "cta.form.emailPlaceholder": "Enter your email",
    "cta.form.submit": "Signup",
    "cta.form.submitting": "Submitting...",
    "cta.form.emailRequired": "Email is required",
    "cta.form.emailInvalid": "Please enter a valid email address.",
    "cta.success": "Subscribed successfully. Returning to start…",
    "cta.error.generic": "Subscription failed",
    "cta.privacy": "By subscribing you agree to our",
    "cta.success.title": "You’re subscribed!",
    "cta.success.description": "Thanks for joining our newsletter. Want to reserve your GR1T now?",
    "cta.success.notNow": "Not now",
    "cta.success.reserveNowCta": "Reserve your GR1T",
    "cta.choose.title": "Choose your GR1T",
    "cta.choose.description": "Select a model to continue.",
    "cta.choose.back": "Back",
    "cta.promo.foundersTitle": "Join the GR1T Founder’s Club and receive a € 1,500 discount on your first motorcycle.",

    // Promo popup
    "promo.popup.title": "Join our Founder’s circle",
    "promo.popup.discount": "€1500 DISCOUNT",
    "promo.popup.depositLine": "€100 deposit reserves your motorcycle",
    "promo.popup.refundableLine": "100% Refundable. 100% Risk Free.",
    "promo.popup.closeAriaLabel": "Close promotion",
    "common.details": "Details",

    // EICMA page
    "eicma.work.title": "Work with Us",
    "eicma.work.description":
      "If you are interested in working with GR1T Motorcycles as a distributor, we’d love to hear from you!",
    "eicma.meetUsTitle": "Meet Us at EICMA",
    "eicma.meetUsDetails": "Hall 9 Stand S57 | 4 - 9 November 2025",
    "eicma.tagline": "Esposizione Internazionale Delle Due Ruote",

    // Tech page
    "tech.hero.title": "The Power Behind the Silence.",
    "tech.hero.subtitle": "Innovative design and smart technology working together to deliver performance without compromise.",
    "tech.sections.smartTech": "Smart Tech",
    "tech.sections.cameras": "Cameras",
    "tech.sections.everyday": "Everyday Convenience",
    "tech.sections.crafted": "Crafted Performance",
    "tech.smart.display.title": '4G Connected 5" Display',
    "tech.smart.display.description":
      "Stay in control with a bright 5-inch display that integrates wireless Apple CarPlay and Android Auto. Navigate and manage calls seamlessly on the road. With 4G connectivity built in, your ride becomes smarter, safer, and perfectly tuned to the way you move.",
    "tech.smart.charger.title": "Wireless Phone Charger & USB-C",
    "tech.smart.charger.description":
      "A glove compartment above the battery pack houses a wireless charging pad and USB-C port, keeping your devices powered every ride. Whether it's your phone, earbuds, or accessories, charging becomes effortless and always within reach.",
    "tech.smart.keyless.title": "GR1T Keyless Unlock",
    "tech.smart.keyless.description":
      "The bike unlocks automatically as soon as you approach—no more keys. Access is also possible with your phone or smartwatch, giving you a modern, secure, and effortless way to start every journey without interrupting the flow.",
    "tech.smart.app.title": "GR1T App",
    "tech.smart.app.description":
      "Track rides, monitor battery health, run diagnostics, and get predictive maintenance alerts — all from the GR1T app. It connects you to support when you need it, giving you complete control and confidence wherever you ride.",
    "tech.cameras.frontRear.title": "Front & Rear Cameras",
    "tech.cameras.frontRear.description":
      "Dual cameras capture every ride on a secure loop, with optional cloud storage for saving or sharing. Ride with confidence knowing your journeys are protected — a first in this class.",
    "tech.cameras.security.title": "Security",
    "tech.cameras.security.description":
      "A rider-facing camera activates if the bike is moved without your key or device, recording everything that happens. GPS tracking, remote lock, and instant notifications keep you in control from anywhere. It's a smarter layer of protection designed for peace of mind.",
    "tech.everyday.storage.title": "9L Under-Seat Storage",
    "tech.everyday.storage.description":
      "A full 9 liters of under-seat storage lets you carry daily essentials, a backpack, or even our on-board charger and cable. Designed for real life, it proves that electric performance doesn't mean sacrificing everyday practicality.",
    "tech.everyday.racks.title": "Back & Pannier Racks",
    "tech.everyday.racks.description":
      "Each rack is rated for 10 kg — perfect for helmets, laptops, or work gear. Built tough for delivery riders yet refined for commuters, the racks expand the bike's utility without compromising balance or style.",
    "tech.everyday.batteries.title": "2 Removable Batteries",
    "tech.everyday.batteries.description":
      "Removable battery pack slot seamlessly into the frame and can be charged at home, work, or on the go. With a choice of 6 kWh, you decide how much range and flexibility your lifestyle demands.",
    "tech.everyday.onboardCharger.title": "On-Board Charger",
    "tech.everyday.onboardCharger.description":
      "The on-board charger uses a magnetic docking design built to stay secure wherever you ride. With a conveniently placed socket, topping up your batteries is as simple as plugging in.",
    "tech.everyday.chargeAnywhere.title": "Charge Anywhere",
    "tech.everyday.chargeAnywhere.description":
      "Plug in and power up wherever you go. With its integrated on-board charger and accessible external socket, the bike connects easily to public charging stations or standard outlets. No need to remove the batteries — just park, plug in, and ride on with total convenience.",
    "tech.crafted.materials.title": "Premium Materials",
    "tech.crafted.materials.description":
      "From lightweight aluminium components to a refined, ergonomic seat, every element is carefully chosen. Built to withstand daily use yet crafted with a premium touch, it's a motorcycle that delivers quality you can feel at every turn.",
    "tech.crafted.belt.title": "Belt Drive",
    "tech.crafted.belt.description":
      "The belt drive replaces the traditional chain with a system designed for durability and longevity. Smooth, silent, and low-maintenance, it's built to deliver years of reliable riding so you can focus on the road ahead.",
    "tech.crafted.wheels.title": '17" Wheels',
    "tech.crafted.wheels.description":
      "Fitted with premium tyres (Pirelli/Metzeler), the 17-inch wheels deliver stability, traction, and precision handling across all surfaces. From tight city corners to fast open roads, they give you the confidence to ride with total assurance.",
    "tech.crafted.regenerative.title": "Regenerative Braking",
    "tech.crafted.regenerative.description":
      "Regenerative braking converts every deceleration into usable energy, extending your range and making every ride more efficient.",
    // G1S page
    "g1s.hero.title": "The G1S Street",
    "g1s.hero.subtitle": "Engineered for the pulse of the city",
    "g1s.about.title":
      "The G1S isn’t just another electric motorcycle — it’s a new way to ride. Lightweight, stylish, and built for city life.",
    "g1s.about.description":
      "Designed and engineered in Italy’s Motor Valley, it’s a motorcycle that’s as smart as it is sustainable.",
    "g1s.cta.title": "Be First. Save Big.",
    "g1s.cta.discountLine":
      "Reserve a Motorcycle on our exclusive Waiting List and receive a factory discount of €1,500 from the normal starting price of €7,000.",
    "g1s.cta.joinFounders": "Join our Founder’s Circle and benefit from this amazing, one-time price.",
    "g1s.cta.price.regularLabel": "Regular Price",
    "g1s.cta.price.regularValue": "€7,000",
    "g1s.cta.price.untilLabel": "Until 31.1.2026 only",
    "g1s.cta.price.discountValue": "€5,500",
    "g1s.reserving.title": "Reserving is Simple",
    "g1s.reserving.subtitle":
      "If we don’t go to production, or you change your mind, you’ll be refunded in full. No risk, no fine print.",
    "g1s.reserving.card1": "Reserve today with a fully refundable €100.",
    "g1s.reserving.card2": "Customize your Motorcycle when production begins.",
    "g1s.reserving.card3": "Order by January 31st and get priority shipping",
    "g1s.specs.title": "G1S Specs",
    "g1s.specs.technicalTitle": "G1S Technical Specifications",
    "g1s.specs.range.title": "Range",
    "g1s.specs.range.summary": "City: 150 km",
    "g1s.specs.powertrain.title": "Powertrain",
    "g1s.specs.powertrain.summary": "Motor: brushless IPM radial flux, air-cooled",
    "g1s.specs.license.title": "License",
    "g1s.specs.license.summary": "A1/B",
    "g1s.specs.batteries.title": "Batteries",
    "g1s.specs.batteries.summary": "Nominal Capacity: 5.92 kWh total (2.96 kWh x 2)",
    "g1s.specs.chassis.title": "Chassis",
    "g1s.specs.chassis.summary": "Front Suspension: ø 41 mm inverted cartridge forks",
    "g1s.specs.dimensions.title": "Dimensions",
    "g1s.specs.dimensions.summary": "Wheelbase: 1,345 mm",
    "g1s.specs.weight.title": "Weight",
    "g1s.specs.weight.summary": "127kg incl. Battery (94 kg w/out battery)",
    "g1s.specs.ridingModes.title": "Riding Modes",
    "g1s.specs.ridingModes.summary": "City, Performance, Walk, Reverse",
    "g1s.specs.performance.title": "Performance",
    "g1s.specs.performance.summary": "Continuous Power: 11kW – 56Nm @ 3200RPM",
    "g1s.specs.startingPrice.title": "Starting Price",
    "g1s.specs.startingPrice.summary": "EUR 7,000 + VAT",
    "g1s.specs.warranty.title": "Warranty",
    "g1s.specs.warranty.summary": "Motorcycle: 2 years (unlimited km)",
    // G1S warranty detailed copy (EN)
    "g1s.specs.warranty.intro": "Your GR1T motorcycle is backed by a comprehensive warranty:",
    "g1s.specs.warranty.motorcycleYears": "- 2 years on the full motorcycle (unlimited km)",
    "g1s.specs.warranty.batteryYears": "- 6 years on batteries (≥70% capacity guaranteed)",
    "g1s.specs.warranty.coverage":
      "We cover manufacturing defects on major systems, including the frame, electricals, thermal management, and charging equipment.",
    "g1s.specs.warranty.offroad":
      "Off‑road use is covered (if configured for it) and the warranty transfers free of charge within EU/EEA.",
    "g1s.specs.warranty.linkText": "For full terms and exclusions, visit our",
    // G1S specs detailed lines
    "g1s.specs.range.combined": "Combined City/Highway Commuting: 120 km",
    "g1s.specs.performance.continuousPower": "Continuous Power: 11kW – 56Nm @ 3200RPM",
    "g1s.specs.performance.topSpeedMax": "Top speed (max): 130 km/h",
    "g1s.specs.performance.topSpeedSustained": "Top speed (sustained): 120 km/h",
    "g1s.specs.performance.peakTorque": "Peak torque: 85 Nm",
    "g1s.specs.performance.peakPower": "Peak power: 26,6 kW",
    "g1s.specs.weight.totalWithBattery": "Total weight (incl. battery): 127 kg",
    "g1s.specs.weight.withoutBattery": "Weight without battery: 94 kg",
    "g1s.specs.weight.maxCarryingCapacity": "Max. Carrying Capacity: 190 kg",
    "g1s.specs.powertrain.motorDescription":
      "Motor description: brushless motor, interior permanent magnet, radial flux, passively air‑cooled",
    "g1s.specs.powertrain.controller": "Controller: 400 amp, 3‑phase brushless controller with regenerative deceleration",
    "g1s.specs.powertrain.voltage": "Voltage: 74 V",
    "g1s.specs.license.details":
      "A1/B – See country table for license requirements in your country. Always consult local laws and authorities.",
    "g1s.specs.batteries.weight": "Battery Weight: 2 x 16.5 kg",
    "g1s.specs.batteries.chemistry": "Battery Chemistry: 8P20S NMC – 10C high discharge (74 V 40 AH)",
    "g1s.specs.chassis.frontSuspension": "Front Suspension: ø 41 mm inverted cartridge forks",
    "g1s.specs.chassis.rearSuspension": "Rear Suspension: Horizontal shock ø 40 mm with adjustable spring preload",
    "g1s.specs.chassis.frontWheelTravel": "Front Wheel travel: 120 mm",
    "g1s.specs.chassis.rearWheelTravel": "Rear Wheel travel: 120 mm",
    "g1s.specs.chassis.frontBrakes": "Front Brakes: Four piston caliper, 320 x 5 mm disc",
    "g1s.specs.chassis.rearBrakes": "Rear Brakes: Dual piston caliper, 240 x 4.5 mm disc",
    "g1s.specs.chassis.frontTyre": "Front Tyre: Pirelli Angel City 110/70-17”",
    "g1s.specs.chassis.rearTyre": "Rear Tyre: Pirelli Angel City 150/60-17”",
    "g1s.specs.chassis.frontWheel": "Front Wheel: 3,00” x 17”",
    "g1s.specs.chassis.rearWheel": "Rear Wheel: 4,00” x 17”",
    "g1s.specs.dimensions.seatHeight": "Seat height: 810 mm",
    "g1s.specs.dimensions.rake": "Rake: 23°",
    "g1s.specs.dimensions.trail": "Trail: 87.2 mm",
    "g1s.specs.ridingModes.city": "City: 11 kW Peak power",
    "g1s.specs.ridingModes.performance": "Performance: 26.6 kW Peak / 11 kW Continuous power",
    "g1s.specs.ridingModes.walk": "Walk: 3 km/h limitation",
    "g1s.specs.ridingModes.reverse": "Reverse: 3 km/h limitation",
    // 360 stats missing label (add)
    "g1s.stats.removableBatteriesLabel": "Removable Batteries",
    "g1s.stats.rangeLabel": "Range",
    "g1s.stats.topSpeedLabel": "Top Speed",
    "g1s.stats.carryingCapacityLabel": "Carrying Capacity",
    "g1s.stats.nominalPowerLabel": "Nominal Power",
    "g1s.stats.peakPowerLabel": "Peak Power",

    // G1X page (EN)
    "g1x.specs.title": "G1X Specs",
    "g1x.specs.technicalTitle": "G1X Technical Specifications",
    "g1x.specs.range.title": "Range",
    "g1x.specs.range.summary": "City: 150 km",
    "g1x.specs.range.combined": "Combined City/Highway Commuting: 120 km",
    "g1x.specs.powertrain.title": "Powertrain",
    "g1x.specs.powertrain.summary": "Motor: brushless IPM radial flux, air-cooled",
    "g1x.specs.powertrain.motorDescription":
      "Motor description: brushless motor, interior permanent magnet, radial flux, passively air‑cooled",
    "g1x.specs.powertrain.controller": "Controller: 400 amp, 3‑phase brushless controller with regenerative deceleration",
    "g1x.specs.powertrain.voltage": "Voltage: 74 V",
    "g1x.specs.license.title": "License",
    "g1x.specs.license.summary": "A1/B",
    "g1x.specs.license.details":
      "A1/B – See country table for license requirements in your country. Always consult local laws and authorities.",
    "g1x.specs.batteries.title": "Batteries",
    "g1x.specs.batteries.summary": "Nominal Capacity: 5.92 kWh total (2.96 kWh x 2)",
    "g1x.specs.batteries.weight": "Battery Weight: 2 x 16.5 kg",
    "g1x.specs.batteries.chemistry": "Battery Chemistry: 8P20S NMC – 10C high discharge (74 V 40 AH)",
    "g1x.specs.chassis.title": "Chassis",
    "g1x.specs.chassis.summary": "Front Suspension: ø 41 mm inverted cartridge forks",
    "g1x.specs.chassis.rearSuspension": "Rear Suspension: Pull out shock ø 40 mm piston with adjustable spring preload",
    "g1x.specs.chassis.frontWheelTravel": "Front Wheel travel: 120 mm",
    "g1x.specs.chassis.rearWheelTravel": "Rear Wheel travel: 120 mm",
    "g1x.specs.chassis.frontBrakes": "Front Brakes: Four pistons caliper, 320 x 5 mm disc",
    "g1x.specs.chassis.rearBrakes": "Rear Brakes: Dual piston caliper, 240 x 4.5 mm disc",
    "g1x.specs.chassis.frontTyre": "Front Tyre: Metzeler Karoo Street 110/70-17”",
    "g1x.specs.chassis.rearTyre": "Rear Tyre: Metzeler Karoo Street 140/70-17”",
    "g1x.specs.chassis.frontWheel": "Front Wheel: 3,00” x 17”",
    "g1x.specs.chassis.rearWheel": "Rear Wheel: 4,00” x 17”",
    "g1x.specs.dimensions.title": "Dimensions",
    "g1x.specs.dimensions.summary": "Wheelbase: 1,345 mm",
    "g1x.specs.dimensions.seatHeight": "Seat Height: 830 mm",
    "g1x.specs.dimensions.rake": "Rake: 23°",
    "g1x.specs.dimensions.trail": "Trail: 87.2 mm",
    "g1x.specs.weight.title": "Weight",
    "g1x.specs.weight.summary": "127 kg incl. battery (94 kg w/out battery)",
    "g1x.specs.weight.maxCarryingCapacity": "Max. Carrying Capacity: 190 kg",
    "g1x.specs.ridingModes.title": "Riding Modes",
    "g1x.specs.ridingModes.summary": "City, Performance, Walk, Reverse",
    "g1x.specs.ridingModes.city": "City: 11 kW Peak power",
    "g1x.specs.ridingModes.performance": "Performance: 26.6 kW Peak / 11 kW Continuous power",
    "g1x.specs.ridingModes.walk": "Walk: 3 km/h limitation",
    "g1x.specs.ridingModes.reverse": "Reverse: 3 km/h limitation",
    "g1x.specs.performance.title": "Performance",
    "g1x.specs.performance.summary": "Continuous Power: 11kW – 56Nm @ 3200RPM",
    "g1x.specs.performance.topSpeedMax": "Top speed (max): 130 km/h",
    "g1x.specs.performance.topSpeedSustained": "Top speed (sustained): 120 km/h",
    "g1x.specs.performance.peakTorque": "Peak torque: 85 Nm",
    "g1x.specs.performance.peakPower": "Peak Power: 26.6 kW",
    "g1x.specs.startingPrice.title": "Starting Price",
    "g1x.specs.startingPrice.summary": "EUR 8,000 + VAT",
    "g1x.specs.warranty.title": "Warranty",
    "g1x.specs.warranty.summary": "Motorcycle: 2 years (unlimited km)",
    "g1x.specs.warranty.intro": "Your GR1T motorcycle is backed by a comprehensive warranty:",
    "g1x.specs.warranty.motorcycleYears": "- 2 years on the full motorcycle (unlimited km)",
    "g1x.specs.warranty.powertrainYears": "- 3 years or 36,000 km on powertrain and batteries (≥70% capacity guaranteed)",
    "g1x.specs.warranty.coverage":
      "We cover manufacturing defects on major systems, including the frame, electricals, thermal management, and charging equipment.",
    "g1x.specs.warranty.offroad":
      "Off‑road use is covered (if configured for it) and the warranty transfers free of charge within EU/EEA.",
    "g1x.specs.warranty.linkText": "For full terms and exclusions, visit our",
    "g1x.specs.warranty.linkLabel": "Warranty Page",
    "g1x.stats.rangeLabel": "Range",
    "g1x.stats.topSpeedLabel": "Top Speed",
    "g1x.stats.carryingCapacityLabel": "Carrying Capacity",
    "g1x.stats.nominalPowerLabel": "Nominal Power",
    "g1x.stats.peakPowerLabel": "Peak Power",
    "g1x.stats.removableBatteriesLabel": "Removable Batteries",
    // G1X hero/about/reserving/cta (EN)
    "g1x.hero.title": "The G1X Scrambler",
    "g1x.hero.subtitle": "For those who like to take the long way home",
    "g1x.about.header.line1": "The G1X owns the",
    "g1x.about.header.line2": "streets and dares the trails.",
    "g1x.about.header.line3": "Aggressive, fearless, and",
    "g1x.about.header.line4": "built to go beyond.",
    "g1x.about.description": "The G1X is made for riders who want the best of both worlds: city agility and scrambler toughness.",
    "g1x.reserving.title": "Reserving is Simple",
    "g1x.reserving.subtitle":
      "If we don’t go to production, or you change your mind, you’ll be refunded in full. No risk, no fine print.",
    "g1x.reserving.card1": "Reserve today with a fully refundable €100.",
    "g1x.reserving.card2": "Customize your Motorcycle when production begins.",
    "g1x.reserving.card3": "Order by January 31st and get priority shipping.",
    "g1x.cta.title": "Be First. Save Big.",
    "g1x.cta.copy1.prefix": "Reserve a GR1T on our exclusive Waiting List and receive a factory discount of",
    "g1x.cta.copy1.suffix": "from the normal starting price of",
    "g1x.cta.joinFounders": "Join our Founder’s Circle and benefit from this amazing, one-time price.",
    "g1x.cta.price.regularLabel": "Regular Price",
    "g1x.cta.price.untilLabel": "Until 31.1.2026 only",

    // Quality page (EN)
    "quality.homologation.title": "Homologation",
    "quality.homologation.p1":
      "GRT Motorcycles will be homologated and certified for use in the European Union by our manufacturing plant. Homologation is the process whereby our manufacturing operations and production models are certified for use on European roads. The homologation of GRT Motorcycles is covered by the EU Whole Vehicle Type Approval (WVTA) Regulation (EU) 168/2013. According to our current schedule, this means that both our street and scrambler models will be homologated and authorised for use on EU roads and highways by late 2026.",
    "quality.qualityStandards.title": "Quality Standards",
    "quality.qualityStandards.p1":
      "All of our parts, whether sourced from third party suppliers or made by us internally, are certified according to CE Mark. If you have discovered a technical defect or flaw, or would like to report a quality issue, please contact our Customer Service and we will be glad to help you.",
    "quality.qualityStandards.p2":
      "At GR1T Motorcycles, we are going through quality certification process according to the following standards in 2026 and early 2027:",
    "quality.qualityStandards.list.1": "ISO 9001: Quality Management Systems",
    "quality.qualityStandards.list.2": "ISO 14001: Environmental Management Systems",
    "quality.qualityStandards.list.3": "IATF 16949: Automotive Quality Systems",
    "quality.qualityStandards.list.4": "ISO 26262: Road Vehicles Functional Safety",
    "quality.qualityStandards.list.5": "ISO / SAE 21434: Cybersecurity for Vehicles",
    "quality.qualityStandards.list.6": "ISO / IEC 27001: Information Security Management Systems",
    "quality.customerService.title": "Customer Service",
    "quality.customerService.p1":
      "We strive to provide excellent quality not just in design and manufacture, but also in customer service. If you have a quality complaint or issue, you can:",
    "quality.customerService.list.1": "As a customer, submit a support ticket online;",
    "quality.customerService.list.2": "Submit a complaint online",
    "quality.customerService.list.3": "Speak to our live customer service centre;",
    "quality.customerService.list.4": "Liase with the distributor who sold you your GR1T motorcycle, if relevant.",
    "quality.customerService.p2": "You can also reach out to us on social media if this makes you more comfortable.",
    "quality.batteryReplacement.title": "Battery Replacement",
    "quality.batteryReplacement.p1":
      "All GR1T Batteries are manufactured by a third party vendor. We offer a warranty such that any Battery that falls below an 80% maximum charge in the first 6 years from the date of purchase can be replaced by GR1T at no cost to the Motorcycle Owner.",
    "quality.batteryReplacement.p2":
      "In order to take advantage of the battery warranty, you must return the existing Batteries to GR1T for recycling or repair and re-use.",
    "quality.batteryReplacement.list.1":
      "improper installation, including use in a vehicle or application other than that for which it was specified;",
    "quality.batteryReplacement.list.2":
      "physical damage, including but not limited to cracks, leaks, case deformation, impact damage, immersion in water, fire or chemical exposure;",
    "quality.batteryReplacement.list.3":
      "misuse or abuse, including overcharging, under-charging, prolonged deep discharge, or use of non-specified charging equipment;",
    "quality.batteryReplacement.list.4":
      "the use of non-approved parts, modifications, or repairs performed by unauthorised personnel;",
    "quality.batteryReplacement.list.5": "lack of routine maintenance or failure to follow the Owner’s Manual instructions;",
    "quality.batteryReplacement.list.6":
      "storage or transport outside the manufacturer’s specified temperature, humidity or charge conditions;",
    "quality.batteryReplacement.list.7":
      "the Battery has been transferred from the original vehicle to another vehicle (unless explicitly permitted).",
    "quality.batteryReplacement.p3":
      "This warranty shall not apply if the Battery/ies has been subjected to any of the following:",
    "quality.batteryReplacement.p4":
      "In the event of a warranty claim, the Battery must be returned to an authorised Dealer/Installer for testing and replacement. Proof of purchase or of identity must be provided so we can verify ownership. The cost of returning the batteries is that of the Motorcycle Owner.",
    "quality.batteryReplacement.p5": "Any replaced Battery becomes the property of GR1T.",
    "quality.logistics.title": "Logistics & Delivery",
    "quality.logistics.p1":
      "Although we have a small number of motorcycles available to purchase from our distributors, the real excitement at GR1T comes from ordering and configuring your own motorcycle.",
    "quality.logistics.p2":
      "Once constructed and tested, you will receive a notification asking you to confirm your delivery address. Our motorcycles can be delivered:",
    "quality.logistics.list.1": "To you directly",
    "quality.logistics.list.2": "To our network of GR1T stores",
    "quality.logistics.list.3": "To the distributor from whom you have purchased your motorcycle.",
    "quality.logistics.list.4":
      "Delivery is managed through reputable courier companies and you can track each stage of delivery.",
    "quality.hero.title": "Quality",
    "quality.hero.p1":
      "Quality at GR1T goes beyond engineering - it’s a promise. Every motorcycle is backed by rigorous standards, sustainable choices, and dedicated service, so you can ride with confidence today and tomorrow.",

    // Warranty page (EN)
    "quality.warranty.hero.title": "Warranty Terms",
    "quality.warranty.hero.p1":
      "When you buy a GR1T motorcycle, you get more than just cutting-edge engineering. You also get our commitment to stand behind your motorcycle.",
    "quality.warranty.terms.cover.title": "What we cover",
    "quality.warranty.terms.cover.p1": "We cover manufacturing defects on the following parts:",
    "quality.warranty.terms.cover.list.1": "Frame and chassis (manufacturing defects)",
    "quality.warranty.terms.cover.list.2": "Electrical systems and harnesses",
    "quality.warranty.terms.cover.list.3": "Thermal management system",
    "quality.warranty.terms.cover.list.4": "Onboard charging equipment supplied by GR1T",
    "quality.warranty.terms.exclusions.title": "What we don’t cover",
    "quality.warranty.terms.exclusions.list.1":
      "Normal wear parts like tyres, brake pads, chains, belts, sprockets, bulbs and seat covers",
    "quality.warranty.terms.exclusions.list.2":
      "Damage from accidents, racing or competition use, stunts, misuse, or poor storage",
    "quality.warranty.terms.exclusions.list.3": "Damage from immersion in water or usage in extreme weather conditions",
    "quality.warranty.terms.exclusions.list.4": "Modifications or repairs with non-approved parts or software",
    "quality.warranty.terms.exclusions.list.5": "Charging or storage outside GR1T’s published guidelines",
    "quality.warranty.terms.offroad.title": "Off-road use",
    "quality.warranty.terms.offroad.p1":
      "If your bike is configured for off-road or dual-sport riding, it’s covered — as long as you ride within the limits of the Owner’s Manual.",
    "quality.warranty.terms.responsibilities.title": "Your responsibilities",
    "quality.warranty.terms.responsibilities.list.1": "Follow the maintenance schedule and keep receipts or records",
    "quality.warranty.terms.responsibilities.list.2": "Use GR1T-approved chargers and charging profiles",
    "quality.warranty.terms.responsibilities.list.3": "Install software updates when provided",
    "quality.warranty.terms.responsibilities.list.4": "Report issues promptly",
    "quality.warranty.terms.data.title": "Data and diagnostics",
    "quality.warranty.terms.data.p1":
      "To keep your bike safe and reliable, GR1T collects certain diagnostic data (such as charging behaviour and performance logs). This helps us confirm warranty claims, improve safety, and enhance future models.",
    "quality.warranty.terms.data.p2": "Data are processed under GDPR and stored in the EU.",
    "quality.warranty.terms.transferable.title": "Transferable",
    "quality.warranty.terms.transferable.p1":
      "If you sell your motorcycle within the EU/EEA, the remaining warranty passes to the next owner free of charge.",
    "quality.warranty.terms.law.title": "Always protected by law",
    "quality.warranty.terms.law.p1":
      "This warranty adds to your statutory 2-year legal guarantee under EU law. Your consumer rights are always preserved.",

    // Warranty EU detailed (EN)
    "quality.warrantyEU.title": "Limited Warranty for EU/EEA Customers of GRIT Motorcycles GmbH",
    "quality.warrantyEU.s1.title": "1. Definitions",
    "quality.warrantyEU.s1.list.1":
      "Legal guarantee (Gewährleistung): Statutory 2-year guarantee of conformity under Directive (EU) 2019/771 and national law (e.g. §§ 434 ff. BGB).",
    "quality.warrantyEU.s1.list.2":
      "Commercial warranty (Garantie): Voluntary coverage described in this document, in addition to statutory rights.",
    "quality.warrantyEU.s1.list.3":
      "SOH (State of Health): Usable battery capacity compared with original nominal capacity, measured by GR1T diagnostic protocol at 25 °C.",
    "quality.warrantyEU.s2.title": "2. Statutory Rights",
    "quality.warrantyEU.s2.p1":
      "Your legal rights under the EU consumer guarantee remain unaffected. These apply for 3 years from delivery, enforceable against the seller.",
    "quality.warrantyEU.s3.title": "3. GR1T Commercial Warranty",
    "quality.warrantyEU.s3.list.1": "Motorcycle (all components unless excluded): 36 months, 36,000 km.",
    "quality.warrantyEU.s3.list.2":
      "Powertrain (motor, controller, gearbox, onboard charger, BMS): 36 months or 36,000 km (whichever comes first).",
    "quality.warrantyEU.s3.list.3":
      "6 years to retain at least 80% SOH. If SOH falls below threshold under compliant use, GR1T will repair or replace the battery or modules.",
    "quality.warrantyEU.s4.title": "4. Coverage Includes",
    "quality.warrantyEU.s4.list.1": "Chassis and frame (manufacturing defects only)",
    "quality.warrantyEU.s4.list.2": "Electrical system and harnesses (manufacturing defects only)",
    "quality.warrantyEU.s4.list.3": "Thermal management system (manufacturing defects only)",
    "quality.warrantyEU.s4.list.4": "Supplied onboard charging equipment (manufacturing defects only)",
    "quality.warrantyEU.s5.title": "5. Exclusions",
    "quality.warrantyEU.s5.list.1":
      "Wear items: tyres, brake pads/discs, bearings, chains/belts, sprockets, bulbs, grips, seats, cosmetic trim.",
    "quality.warrantyEU.s5.list.2":
      "Environmental/usage: accidents, racing/competition, stunts, misuse, overloading, improper storage, corrosion, pest damage.",
    "quality.warrantyEU.s5.list.3":
      "Improper maintenance or modifications: skipped scheduled service, non-approved software or parts, tampering with sealed HV components.",
    "quality.warrantyEU.s5.list.4":
      "Charging abuse: charging outside GR1T specifications; deliberate deep-discharge storage; exposure above 55°C; submersion in water or other liquid.",
    "quality.warrantyEU.s6.title": "6. Battery Specifics",
    "quality.warrantyEU.s6.list.1": "Normal degradation: SOH ≥ 80% after 1500 charging cycles.",
    "quality.warrantyEU.s6.list.2":
      "Compliant charging: The GR1T battery is designed for low-voltage charging to full in ~3 hours. Use only approved chargers and follow Owner’s Manual guidance.",
    "quality.warrantyEU.s7.title": "7. Off-Road Use",
    "quality.warrantyEU.s7.p1":
      "If the motorcycle is configured and marketed for off-road/dual-sport use, such use is covered provided it complies with the Owner’s Manual. Competition/race use remains excluded.",
    "quality.warrantyEU.s8.title": "8. Owner Obligations",
    "quality.warrantyEU.s8.list.1": "Follow maintenance schedule and keep records.",
    "quality.warrantyEU.s8.list.2": "Use approved chargers and charging profiles.",
    "quality.warrantyEU.s8.list.3": "Apply GR1T software/firmware updates.",
    "quality.warrantyEU.s8.list.4": "Notify GR1T or dealer of faults within 30 days of discovery.",
    "quality.warrantyEU.s9.title": "9. Claims Process",
    "quality.warrantyEU.s9.list.1": "Contact GR1T or authorised dealer with VIN, mileage, and description.",
    "quality.warrantyEU.s9.list.2": "Telemetry data may be requested to verify compliance.",
    "quality.warrantyEU.s9.list.3": "Covered repairs are performed free of charge (parts and labour).",
    "quality.warrantyEU.s9.list.4": "Transport/recovery to workshop is not included.",
    "quality.warrantyEU.s10.title": "10. GDPR Consent (telematics/data)",
    "quality.warrantyEU.s10.p1":
      "By activating your motorcycle and connecting to GR1T services, you consent to GR1T collecting, processing, and storing diagnostic and usage data (including charging behaviour, fault logs, and performance metrics) for: Warranty verification; Safety monitoring, and Product improvement.",
    "quality.warrantyEU.s10.p2":
      "Data are processed under GDPR, stored within the EU, and shared only with authorised GR1T partners as necessary. Detailed privacy terms are available in GR1T’s Privacy Policy. Consent can be withdrawn, but this may affect warranty eligibility where data are required to assess compliance.",
    "quality.warrantyEU.s11.title": "11. Transferability",
    "quality.warrantyEU.s11.p1":
      "This Limited Warranty is transferable to subsequent owners within the EU/EEA for the unexpired term, without cost.",
    "quality.warrantyEU.s12.title": "12. Governing Law",
    "quality.warrantyEU.s12.p1":
      "This warranty is governed by German law. Courts in Berlin have non-exclusive jurisdiction, without prejudice to your consumer rights in your country of residence.",

    // Sustainability page (EN)
    "sustainability.hero.title": "Sustainability",
    "sustainability.hero.p1":
      "At GR1T, sustainability is built into every step - from design and sourcing to end-of-life. We follow strict EU standards to ensure recycling, transparency, circularity, and repairability—building motorcycles that respect riders and the planet.",
    "sustainability.intro.p1":
      "All GR1T Motorcycles are designed with sustainability and circular manufacturing in mind. This covers our plant operations as well as our motorcycle product design and sourcing, as well as all other operations.",
    "sustainability.intro.p2": "Specifically:",
    "sustainability.list.iso14001.title": "ISO 14001 Environmental Management Systems",
    "sustainability.list.iso14001.p1":
      "We are working to achieve ISO 14001 certification, which is for environmental management systems. This ensures that all activities we undertake that may have a harmful effect on the environment have a corresponding technological and management plan to address them. Once certified, we will be reporting on our EMS progress every year, and as customers you are invited to comment upon this.",
    "sustainability.list.batterySustainability.title": "Battery Sustainability",
    "sustainability.list.batterySustainability.p1":
      "Our batteries are recycled and in many cases, factory-reconditioned for re-use. If they are not re-used, they are recycled based on EU Regulation 2023/1542 which entered into force on 17 August 2023. This specifies a full life cycle approach to battery use, from sourcing of raw materials to design and manufacturing to use, reuse and collection and then recycling and disposal. For this reason, we ask you to report any battery defects or issues and only purchase GR1T-approved batteries",
    "sustainability.list.digitalBatteryPassport.title": "Digital Battery Passport",
    "sustainability.list.digitalBatteryPassport.p1":
      "From the start of our manufacturing process, we are introducing the Digital Battery Passport required by EU Regulation 2023/1542. This will include the identification of the battery model and manufacturer; information on the carbon footprint, composition and recycled content; and data on capacity and state of health. Instructions for disassembly, recycling and safe handling will also be provided.",
    "sustainability.list.digitalDashboard.title": "Digital Dashboard; Chargers and Cabling Systems",
    "sustainability.list.digitalDashboard.p1":
      "The digital dashboard as well as all chargers and electric cabling systems in the GR1T motorcycle line are recoverable and recyclable. You can either recycle these using a national recycling scheme in your country of residence. Alternatively, you can return these to GR1T distributors and our own sales network for recycling. Recycling and re-purposing takes place at our factory and are in line with the EU Waste Electrical and Electronic Equipment Directive (2012/19/EU) (the WEEE Directive).",
    "sustainability.list.digitalProductPassport.title": "Digital Product Passport",
    "sustainability.list.digitalProductPassport.p1":
      "Our GR1T G1S and G1X platforms are also ready to adapt the Digital Product Passport when this becomes legally mandated.",
    "sustainability.list.rightToRepair.title": "Right to Repair Directive",
    "sustainability.list.rightToRepair.p1":
      "In line with our commitment to customizing and upgrading all GR1T Motorcycles, we comply with the Right to Repair Directive. This means that you can re-order every single spare part and component you need to repair your GR1T Motorcycle from our website, or find them (subject to availability) at our stores or distributors.",
    "sustainability.list.elv.title": "End-of-Life Vehicles (ELV)",
    "sustainability.list.elv.p1":
      "To highlight our total commitment to recycling and circularity, you can contact us to arrange our repurchase of your GR1T Motorcycle. Why? Because from our side, we can re-use a certain amount of components and materials. And because as a committed European manufacturer, we comply with all regulation in this space because respecting the environment is part of our DNA.",
    "sustainability.list.chemicals.title": "Chemicals and Materials",
    "sustainability.list.chemicals.p1":
      "All chemicals and chemical-containing, plastic, rubber and other items, including paints and coatings, comply with the EU REACH Regulation (EC) No 1907/2006 as well as the Restriction of Hazardous Substances Directive (RoHS2). We also comply with the Persistent Organic Chemicals (POP) Regulation. Our suppliers are required to provide all compliance certificates with these laws.",
    "sustainability.list.packaging.title": "Packaging",
    "sustainability.list.packaging.p1":
      "We ensure all components used in our packaging and supply chain line, from corrugated board to plastic coverings, are recoverable and recyclable.",
    "sustainability.list.csddd.title": "Corporate Sustainability Due Diligence Directive (CSDDD) (2024/1760)",
    "sustainability.list.csddd.p1":
      "We comply with the CSDDD Directive, which also forms a core part of our ISO 14001 and ISO 9001 certification processes.",
    "sustainability.list.energyEfficiency.title": "Factory Energy Efficiency",
    "sustainability.list.energyEfficiency.p1":
      "Our factory is gradually being expanded and renovated. Part of this process involves complying with energy efficiency standards. We will be implementing ISO 50001 Energy Management Systems as well as the requirements of the Energy Efficiency Directive (2023/1791) as part of our expansion process between 2027 and 2030.",
    "sustainability.list.ghg.title": "Greenhouse Gas Emissions",
    "sustainability.list.ghg.p1":
      "We are developing a measurement system for GHG and will be providing detailed reporting on this from mid-2027 onwards.",
  },
  it: {
    // Navigation
    "nav.home": "Home",
    "nav.bikes": "Moto",
    "nav.g1series": "Serie G1",
    "nav.about": "Chi Siamo",
    "nav.news": "Notizie",
    "nav.corporate": "Azienda",
    "nav.contact": "Contatti",
    "nav.tech": "Tecnologia",
    "nav.foundersCircle": "Founder’s Circle",
    "nav.quality": "Qualità",
    "nav.events": "Eventi",
    "nav.sustainability": "Sostenibilità",

    // Hero section
    "hero.title": "MOTOCICLETTE ELETTRICHE",
    "hero.subtitle": "PROGETTATE IN ITALIA",
    "hero.description": "Realizziamo motociclette elettriche leggere e ad alte prestazioni per le città di domani",

    // Schedule
    "schedule.summer2025": "Estate 2025:",
    "schedule.fall2025": "Autunno 2025:",
    "schedule.eicma2025": "EICMA 2025:",
    "schedule.winter2025": "Inverno 2025/26:",
    "schedule.spring2026": "Primavera 2026:",
    "schedule.summer2026": "Estate 2026:",
    "schedule.fall2026": "Autunno 2026:",
    "schedule.january2027": "1 Gennaio 2027:",
    "schedule.roadTesting": "Test su Strada",
    "schedule.investorPresentations": "Presentazioni a Investitori e Distributori",
    "schedule.formalLaunch": "Lancio Formale",
    "schedule.furtherTesting": "Ulteriori Test su Strada e Sviluppo",
    "schedule.designFinalization": "Finalizzazione del Design e Aggiornamento Ingegneristico",
    "schedule.factoryDevelopment": "Sviluppo della Fabbrica",
    "schedule.preOrders": "Preordini di Vendita",
    "schedule.salesLaunch": "Lancio delle Vendite e Prime Consegne",
    "schedule.detailedInfo":
      "Informazioni dettagliate sulla fase di {activity}. Questo includerà traguardi specifici, obiettivi e risultati attesi.",
    "schedule.additionalPlans":
      "Inoltre, stiamo pianificando una gamma di altri modelli e versioni. Ogni anno, stiamo anche pianificando un'innovazione continua per migliorare le prestazioni del gruppo propulsore e l'autonomia.",

    // Corporate section
    "corporate.mission": "La Nostra Missione",
    "corporate.vision": "La Nostra Visione",
    "corporate.values": "Valori Fondamentali",
    "corporate.schedule": "Programma di Sviluppo",
    "corporate.schedule.title": "Il nostro programma di sviluppo include:",
    "corporate.info": "Informazioni Aziendali",
    "corporate.title": "Azienda",
    "corporate.description":
      "Siamo una startup di motociclette elettriche dedicata allo sviluppo di soluzioni di mobilità innovative per un'economia a zero emissioni.",
    "corporate.overview.part1":
      "Siamo una startup di motociclette elettriche dedicata allo sviluppo di soluzioni di mobilità innovative per un'economia a zero emissioni. Le nostre motociclette sono progettate per essere macchine potenti e sofisticate che svolgono il ruolo di trasporto rimanendo divertenti ed emozionanti da guidare.",
    "corporate.overview.part2":
      "La nostra attuale motocicletta elettrica è un pendolare urbano/suburbano con un'autonomia di 150 km, un carico utile di 190 kg e una velocità massima di 130 km/h, il tutto con un peso di 127 kg. Lo stile e il design della moto sono stati sviluppati dalla nostra agenzia di design italiana, con l'intento di sviluppare una moto che le persone ameranno guidare.",
    "corporate.development.title": "Sviluppo",
    "corporate.development.description":
      "Il nostro processo di sviluppo si concentra sulla creazione di motociclette elettriche che combinano prestazioni, sostenibilità e stile.",
    "corporate.distributors.link": "Diventa Distributore",
    "corporate.investors.link": "Diventa Investitore",
    "corporate.fleetSales.link": "Vendite Fleet",
    "corporate.fleetSales.title": "Vendite Fleet",
    "corporate.fleetSales.description":
      "GR1T prevede di avviare le vendite della nostra motocicletta elettrica a gennaio 2027. Stiamo cercando distributori nei seguenti paesi. Prevediamo di espanderci per fasi in base ai vincoli di liquidità e alle vendite.",
    // Corporate subpages - Fleet Sales (IT)
    "fleetSales.headerTitle": "Difesa, Civile e Vendite Fleet",
    "fleetSales.headerDescription":
      "Con un'autonomia di 150 km e un carico utile best-in-class di 190 kg, la nostra motocicletta elettrica è ottimamente posizionata per vendite fleet e soluzioni di consegna dell’ultimo miglio. Alcune delle applicazioni che siamo aperti a pianificare includono:",
    "fleetSales.items.military.title": "Militari, Polizia e Protezione Civile",
    "fleetSales.items.military.description":
      "Siamo pronti a collaborare con autorità militari, di polizia e di protezione civile qualificate (come vigili del fuoco, guardie forestali, guardie di frontiera, ecc.) per sviluppare motociclette silenziose a lunga autonomia con un carico utile di 190 kg.",
    "fleetSales.items.rentals.title": "Noleggi Moto / Noleggi Turistici",
    "fleetSales.items.rentals.description":
      "La nostra motocicletta elettrica è ottimale come veicolo di scelta per capitali storiche, isole, marine e altre aree che desiderano un veicolo sostenibile dal punto di vista ambientale, silenzioso e che non disturbi natura, fauna, ospiti o residenti con rumore e inquinamento.",
    "fleetSales.items.resorts.title": "Resort, Marine, Campi da Golf",
    "fleetSales.items.resorts.description":
      "I grandi resort alberghieri che includono marine, campi da golf, piste da sci e altri servizi traggono beneficio da una motocicletta potente per il personale, le consegne e altri ruoli di supporto, con zero rumore e zero emissioni di carbonio.",
    "fleetSales.items.natureParks.title": "Riserve Naturali, Parchi Nazionali, Parchi Safari",
    "fleetSales.items.natureParks.description":
      "La nostra motocicletta elettrica offre trasporti silenziosi per guardiani o personale in riserve naturali, parchi safari o altre aree protette. Possiamo predisporre stazioni di ricarica alimentate a energia solare in posizioni idonee per garantire autonomia e riserve di energia.",
    "fleetSales.items.postCourier.title": "Poste e Corrieri",
    "fleetSales.items.postCourier.description":
      "Se sei un'azienda postale o di corrieri e desideri utilizzare la nostra motocicletta elettrica per posta, pacchi e altre consegne, offriamo un carico utile di 190 kg con soluzioni di branding innovative, inclusi bauletto posteriore e borse laterali.",
    "fleetSales.items.foodDelivery.title": "Aziende di Food Delivery",
    "fleetSales.items.foodDelivery.description":
      "Se desideri passare a una motocicletta elettrica potente ma versatile per la consegna di cibo, il nostro modello ha un'autonomia di 150 km con 2 batterie e un carico utile best-in-class di 190 kg.",

    // Founders Circle page (IT)
    "founders.title": "GR1T Founder’s Circle",
    "founders.discountCta": "Ottieni uno sconto di €1.500 se prenoti entro il 31.1.2026",
    "founders.reserving.intro.bold": "Versando un deposito rimborsabile di €100,",
    "founders.reserving.intro.p1":
      "bloccherai l’accesso prioritario alla nostra prima produzione e uno sconto esclusivo di €1.500 sul modello di lancio. L’offerta è limitata e valida solo per prenotazioni effettuate entro il 31 Gennaio 2026. Entrando nella Founder’s Circle, sarai il primo a configurare la tua moto, ricevere aggiornamenti riservati e assicurarti un posto nel futuro di GR1T.",
    "founders.reserving.simpleTitle": "La prenotazione è semplice",
    "founders.reserving.simpleCopy":
      "Se non andremo in produzione, o cambi idea, verrai rimborsato integralmente. Nessun rischio, nessuna clausola nascosta.",
    "founders.cards.reserve.line1": "Prenota oggi con",
    "founders.cards.reserve.line2": "€100 completamente rimborsabili.",
    "founders.cards.customize.line1": "Personalizza la tua moto",
    "founders.cards.customize.line2": "quando inizia la produzione.",
    "founders.cards.order.line1": "Ordina entro il 31 Gennaio",
    "founders.cards.order.line2": "e ottieni spedizione prioritaria",
    "founders.bikes.g1s.title": "GR1T G1S",
    "founders.bikes.g1s.description": "Un commuter urbano all’avanguardia che unisce agilità, eleganza e utilità reale.",
    "founders.bikes.g1s.startingPrice": "Prezzo a partire da €7,000 + IVA",
    "founders.bikes.discountBadge.g1s": "€1,500 di sconto sul prezzo di listino di €7,000 se prenoti entro il 31.1.2026",
    "founders.bikes.discountBadge.g1x": "€1,500 di sconto sul prezzo di listino di €8,000 se prenoti entro il 31.1.2026",
    "founders.bikes.footnote": "*se prenoti entro il 31.1.2026",
    "founders.bikes.reserveButton": "Prenota con €100",
    "founders.bikes.g1x.title": "GR1T G1X",
    "founders.bikes.g1x.description": "Uno scrambler versatile, perfetto tra le strade urbane e le avventure del weekend.",
    "founders.bikes.g1x.startingPrice": "Prezzo a partire da €8,000 + IVA",
    "founders.faq.title": "FAQ Founder’s Circle",
    "founders.terms.linkText": "Termini e Condizioni.",

    // Founders FAQ (IT)
    "founders.faq.q.what": "Cos’è la GR1T Founder’s Circle?",
    "founders.faq.a.what.p1":
      "Un’opportunità a tempo limitato per le prime persone che sosteranno il progetto GR1T. Prevede uno sconto di €1.500 sul prezzo di listino iniziale (MSRP) del modello selezionato.",
    "founders.faq.a.what.list.1": "G1S ‘Street’: Prezzo di listino €6.999 + IVA — Prezzo Founder’s Circle: €5.499 + IVA",
    "founders.faq.a.what.list.2": "G1X ‘Scrambler’: Prezzo di listino €7.999 + IVA — Prezzo Founder’s Circle: €6.499 + IVA",
    "founders.faq.a.what.terms": "I termini completi dell’offerta Founder’s Circle sono disponibili qui.",
    "founders.faq.q.claimDiscount": "Come posso ottenere lo sconto di €1.500?",
    "founders.faq.a.claimDiscount.p1":
      "Dal giorno ufficiale di apertura delle prenotazioni, potrai versare un deposito rimborsabile di €100 per bloccare il tuo sconto ed entrare a far parte della GR1T Founder’s Circle.",
    "founders.faq.q.expire": "Quando scade l’offerta?",
    "founders.faq.a.expire.p1": "L’offerta Founder’s Circle termina il 31 Gennaio 2026.",
    "founders.faq.q.depositRisk": "Il deposito è a rischio?",
    "founders.faq.a.depositRisk.p1":
      "No. Tutti i depositi vengono versati su un conto separato che non verrà utilizzato in alcun modo dall’azienda. Il tuo deposito è completamente rimborsabile in qualsiasi momento se cambi idea, restando sempre svincolato da ogni obbligo di acquisto.",
    "founders.faq.q.reservationBinding": "La tassa di prenotazione è vincolante?",
    "founders.faq.a.reservationBinding.p1":
      "No. Il deposito di €100 è completamente rimborsabile e non comporta alcun obbligo di acquisto.",
    "founders.faq.q.afterReserve": "Cosa succede dopo la prenotazione?",
    "founders.faq.a.afterReserve.p1":
      "Dal momento in cui GR1T sarà pronta alla produzione, riceverai le opzioni di configurazione, aggiornamenti sulla consegna e assistenza prioritaria.",
    "founders.faq.q.deliveriesStart": "Quando inizieranno le consegne?",
    "founders.faq.a.deliveriesStart.p1":
      "Prevediamo le prime consegne all’inizio del 2027, dopo la conferma del finanziamento della produzione.",
    "founders.faq.q.transferDiscount": "Posso trasferire lo sconto a qualcun altro?",
    "founders.faq.a.transferDiscount.p1": "No. Lo sconto è personale e legato ai dati forniti al momento dell’iscrizione.",
    "founders.faq.q.availability": "La moto sarà disponibile nel mio Paese?",
    "founders.faq.a.availability.p1":
      "Spediremo in tutto il mondo, iniziando però dai principali mercati europei. Potrebbe non essere omologata nel tuo Paese inizialmente. Al momento dell’iscrizione, indicherai il Paese di residenza per pianificare al meglio le consegne. Ti terremo informato man mano che ci espanderemo nei vari mercati.",
    "founders.faq.q.specChanges": "Cosa succede se le specifiche cambiano?",
    "founders.faq.a.specChanges.p1":
      "Potrebbero verificarsi modifiche minori durante la fase di perfezionamento del design, ma la moto resterà fedele alle prestazioni e al design presentati.",

    // Corporate subpages - Conferences (IT)
    "corporate.conferences.title": "Conferenze e Eventi",
    "corporate.conferences.description":
      "Ogni anno partecipiamo a una vasta gamma di eventi e conferenze. L'elenco attuale è riportato di seguito: gli aggiornamenti vengono effettuati regolarmente durante l'anno. Contattaci per organizzare una visita o un incontro in uno di questi eventi.",
    "conferences.events.sifted.title": "Sifted Summit — Londra, Inghilterra — 8–9 Ottobre 2025",
    "conferences.events.sifted.p1":
      "Unisciti a 3.000 founder, operatori di startup e scaleup e investitori per celebrare la resilienza dell'ecosistema e come i suoi principali protagonisti si stanno preparando al lungo termine. Si tiene al Magazine London a North Greenwich — ti aspettiamo.",
    "conferences.events.sifted.p2": "",
    "conferences.events.sifted.linkText": "Sifted Summit",
    "conferences.events.sifted.linkUrl": "https://summit.sifted.eu/",
    "conferences.events.sifted.link": "https://summit.sifted.eu/",
    "conferences.events.sevenstar.title": "Seven Star Award — Lisbona, Portogallo — 11 Ottobre 2025",
    "conferences.events.sevenstar.p1":
      "Riconosciuti come l'autorità principale nel riconoscimento del lusso, i premi sono un faro per viaggiatori esigenti e appassionati di lifestyle in tutto il mondo. Con una combinazione unica di approfondimenti basati sui dati e contenuti originali, l'organizzazione si è affermata come voce fidata tra il pubblico elitario che serve.",
    "conferences.events.k2match.title": "K2 Match Investor Summit — Monaco — 16–17 Ottobre 2025",
    "conferences.events.k2match.p1":
      "K2MATCH offre un ecosistema imprenditoriale internazionale curato per Startup e ScaleUp. Mettiamo in contatto Startup con Investitori, Corporate, Community di Business, Partner Esperti di Soluzioni e forniamo soluzioni e servizi di crescita di livello mondiale.",
    "conferences.events.k2match.link": "https://www.k2match.com/",
    "conferences.events.eicma.title": "EICMA 2025 — Milano, Italia — 4–9 Novembre 2025",
    "conferences.events.eicma.p1":
      "L'Esposizione Internazionale del Ciclo e Motociclo, a livello mondiale, è l'evento fieristico più importante per l'intero settore delle 2 ruote e rappresenta lo strumento di marketing di ANCMA, l'Associazione Industriale di Confindustria che riunisce le aziende più prestigiose del settore.",
    "conferences.events.eicma.link": "https://www.eicma.it/en/",
    "conferences.events.websummit.title": "Web Summit — Lisbona, Portogallo — 10–13 Novembre 2025",
    "conferences.events.websummit.p1":
      "Il Web Summit è stato fondato a Dublino nel 2009 da Paddy Cosgrave. È iniziato come una conferenza tecnologica di 150 persone nell'ottobre 2009. Dal 2009, il Web Summit ha riunito oltre un milione di professionisti da tutto il mondo.",
    "conferences.events.websummit.link": "https://websummit.com/",

    // Corporate subpages - Distributors (IT)
    "corporate.distributors.title": "Distributori",
    "corporate.distributors.description":
      "GR1T prevede di lanciare le vendite della nostra motocicletta elettrica a gennaio 2027. Stiamo cercando distributori nei seguenti paesi. Prevediamo di espanderci in fasi soggette a vincoli di flusso di cassa e vendite.",
    "distributors.offer.title": "Se sei interessato a diventare un distributore GR1T, possiamo offrirti:",
    "distributors.offer.item1": "Condizioni commerciali altamente vantaggiose sulle vendite di motociclette",
    "distributors.offer.item2":
      "Eccellenti termini di garanzia per i consumatori, con una corrispondente scorta di motociclette, batterie e merchandising",
    "distributors.offer.item3": "Contratti di manutenzione e supporto tecnico chiari",
    "distributors.offer.item4":
      "Accesso al nostro sistema di ordini e CRM basato sul web che consente una gestione senza soluzione di continuità dei clienti al dettaglio: i tuoi clienti rimangono i tuoi clienti.",
    "distributors.offer.item5": "Ampia formazione alle vendite e supporto tecnico",
    "distributors.offer.item6": "Eventi in negozio / in sistema ed eventi BTL",
    "distributors.expect.title": "In cambio, ci aspettiamo:",
    "distributors.expect.item1": "Forte impegno verso i valori, la tecnologia e le iniziative GR1T",
    "distributors.expect.item2": "Sforzo di vendita creativo, dinamico e coerente",
    "distributors.expect.item3": "Forte supporto ai clienti in ogni momento",
    "distributors.expect.item4": "Il tuo supporto al design del prodotto e del servizio e allo sviluppo continuo",
    "distributors.countries.paragraph":
      "Stiamo cercando distributori nazionali e regionali nei seguenti paesi, con il lancio previsto tra il 2027 e il 2029. La data di lancio dipenderà dal completamento del finanziamento, dalla pianificazione congiunta delle vendite e da altre attività.",
    "distributors.priority1": "Priorità 1",
    "distributors.priority2": "Priorità 2",
    "distributors.priority3": "Priorità 3",
    "distributors.priority4": "Priorità 4",
    "distributors.priority1.countries": "Italia / Grecia",
    "distributors.priority2.countries": "Francia / Spagna",
    "distributors.priority3.countries": "Germania / Portogallo",
    "distributors.priority4.countries": "Altri paesi",

    // Corporate subpages - Investors (IT)
    "corporate.investors.title": "Investitori",
    "corporate.investors.description":
      "GR1T sta attualmente implementando il suo round di seed. Stiamo raccogliendo € 5,5 milioni che saranno utilizzati per lanciare il secondo round di test del nostro prototipo GR1T, preparare la nostra produzione e avviare la produzione a gennaio 2027. Qui è incluso un breve riepilogo del nostro round di raccolta fondi.",
    "investors.items.raise.title": "Raccolta Investimenti",
    "investors.items.raise.value": "EUR 7 milioni",
    "investors.items.representation.title": "Rappresentanza",
    "investors.items.representation.value": "1 posto nel Consiglio di Amministrazione",
    "investors.items.return.title": "Rendimento per l'Investitore",
    "investors.items.return.value": "x50",
    "investors.items.closing.title": "Chiusura",
    "investors.items.closing.value": "31 Gennaio 2026",
    "investors.items.capTable.title": "Cap Table Attuale",
    "investors.items.capTable.item1": "Azionista 1: 33,33%",
    "investors.items.capTable.item2": "Azionista 2: 33,33%",
    "investors.items.capTable.item3": "Azionista 3: 33,33%",
    "investors.useOfFunds.title": "Uso dei Fondi",
    "investors.useOfFunds.amount": "Importo (€)",
    "investors.useOfFunds.factoryRenovation": "Ristrutturazione della Fabbrica",
    "investors.useOfFunds.factoryEquipment": "Attrezzature della Fabbrica",
    "investors.useOfFunds.moulds": "Stampi e Attrezzature",
    "investors.useOfFunds.additionalRD": "R&S Aggiuntiva",
    "investors.useOfFunds.market1": "Rollout Mercato 1",
    "investors.useOfFunds.market2": "Rollout Mercato 2",
    "investors.useOfFunds.productionCapital": "Capitale di Produzione",
    "investors.useOfFunds.productionStaff": "Personale di Produzione",
    "investors.useOfFunds.utilities": "Utenze e Operatività",
    "investors.useOfFunds.total": "Totale",
    "investors.contact": "Per ulteriori informazioni e per richiedere il nostro pitch deck, contattaci a",
    "investors.contact.email": "invest(at)gritmotorcycles.com",

    // Corporate subpages - Work With Us (IT)
    "corporate.work.title": "Lavora con Noi",
    "corporate.work.description":
      "GR1T Motorcycles è una startup in fase di lancio. Questa pagina fornisce informazioni sulle nostre opportunità di approvvigionamento. Tutti gli acquisti sono gestiti professionalmente in base alle migliori pratiche internazionali, a distanza, e sono valutati dai membri responsabili del nostro team di gestione.",
    "work.procurement.title": "Approvvigionamenti",
    "work.procurement.website": "Sviluppo Sito Web Aziendale",
    "work.procurement.branding": "Supporto di Consulenza per il Branding Aziendale",
    "work.procurement.website.deadline": "31 luglio 2025",
    "work.procurement.branding.deadline": "31 luglio 2025",
    "work.status.closed": "Chiuso",
    "work.status.openContingent": "Aperto, subordinato al finanziamento",
    "work.deadline": "SCADENZA:",
    "work.recruitment.title": "Assunzioni",
    "work.recruitment.qualityManager": "Quality Manager",
    "work.recruitment.productionManager": "Production Manager",
    "work.recruitment.eicmaTemp": "Staff Temporaneo EICMA",
    "work.recruitment.eicmaTemp.deadline": "1 settembre 2025",

    // Values
    "values.emotion": "Emozione",
    "values.innovation": "Innovazione",
    "values.sustainability": "Sostenibilità",
    "values.integrity": "Integrità",
    "values.independence": "Indipendenza",
    "values.emotion.description": "Creiamo motociclette che evocano passione ed entusiasmo in ogni corsa.",
    "values.innovation.description": "Spingiamo costantemente i confini con tecnologia e design all'avanguardia.",
    "values.sustainability.description": "Siamo impegnati in una produzione e operazioni ecologicamente responsabili.",
    "values.integrity.description": "Conduciamo affari con onestà, trasparenza e standard etici.",
    "values.independence.description": "Manteniamo la libertà creativa per perseguire la nostra visione senza compromessi.",

    // Mission & Vision
    "mission.title": "La Nostra Missione",
    "mission.description":
      "La nostra missione è semplice: ridefinire la mobilità urbana con macchine costruite per la libertà e l'individualità.\n\nCreiamo motociclette completamente elettriche che risolvono i problemi reali di mobilità senza perdere il brivido, le prestazioni grezze o il design affilato che rendono la guida degna di essere vissuta. Siamo qui per ridefinire l'aspetto della mobilità—macchine ad alte prestazioni costruite con uno scopo, progettate per il futuro e radicate nella sostenibilità fin dalle fondamenta.",
    "vision.title": "La Nostra Visione",
    "vision.description":
      "GR1T sta plasmando il futuro del motociclismo—elettrico, elegante e costruito per prestazioni. Progettate in Italia e realizzate in Europa, ogni modello è creato per i motociclisti che apprezzano stile, sostanza e sostenibilità.\n\nStiamo costruendo motociclette che si adattano alla vita reale: pendolarismo durante la settimana, fughe nei fine settimana o gestione delle esigenze di consegna dell'ultimo miglio. Dal design della batteria alla riciclabilità, ogni dettaglio è progettato per prestazioni, longevità e un'impronta ambientale più leggera.\n\nEntro il 2030, la nostra gamma includerà quattro modelli, ognuno pronto per la strada che ci attende—rispettando l'eliminazione graduale dei motori a combustione interna del 2035 e sostenendo la visione Net Zero 2050 dell'UE. Non ci stiamo adattando al cambiamento. Lo stiamo creando.\n\nOgnuno viene fornito con una configurazione standard a due batterie o una versione XR a autonomia estesa. Con l'evoluzione della tecnologia, evolvono anche le nostre prestazioni—avvicinando sempre più l'elettrico alla parità con la combustione.\n\nLa sostenibilità è integrata in tutto ciò che facciamo. Dalla produzione pulita al riciclaggio delle batterie e ai principi di design circolare, l'intera nostra catena del valore riflette il nostro impegno per un futuro migliore.\n\nCrediamo anche nel fare business nel modo giusto—crescendo attraverso il miglioramento costante e trattando ogni partner e membro del team con equità e rispetto.\n\nQuesto è GR1T. Motociclette elettriche create per ciò che verrà.",

    // Home page
    "home.craft.title": "Scopri di più sul nostro mestiere",
    "home.craft.description": "Scopri la passione, la precisione e l'innovazione dietro ogni motocicletta GR1T.",
    "home.craft.button": "Leggi di più",
    "home.tagline": "L’esploratore urbano di una nuova generazione.",
    "home.news.title": "Ultime Notizie",
    "home.news.description": "Rimani aggiornato con gli ultimi sviluppi e annunci da GR1T Motorcycles.",
    "home.specs.batteries": "batterie rimovibili",
    "home.specs.weight": "peso",
    "home.specs.range": "autonomia",
    "home.specs.topSpeed": "velocità max",
    "home.specs.capacity": "portata",
    "home.specs.power": "potenza di picco",
    "home.bikes.title": "La Serie G1. Viaggi diversi, stesso DNA.",
    "home.bikes.description1":
      "Una fusione di agilità, eleganza e prestazioni, arricchita dall’avanguardia delle nuove tecnologie.",
    "home.bikes.description2": "Per chi cerca l’avventura oltre la giungla urbana.",
    "home.bikes.g1s.startingPrice": "Da €7,000 + IVA",
    "home.bikes.g1s.originalStartingPrice": "€7,000 + IVA",
    "home.bikes.g1x.startingPrice": "Da €8,000 + IVA",
    "home.bikes.g1x.originalStartingPrice": "€8,000 + IVA",
    "home.bikes.discountInline.prefix": "Risparmia €1,500",
    "home.bikes.discountInline.suffix": "con una prenotazione rimborsabile di €100 entro il 31.1.2026",
    "home.gallery.title": "Libertà Urbana Senza Compromessi.",
    "home.gallery.description":
      "Progettata in Italia e realizzata in Europa con lo sguardo al futuro, la Serie GR1T combina potenza, stile e funzionalità per un’esperienza di guida superiore.",
    "home.follow.title": "Seguici",
    "home.gallery.overlay.line1": "Precisione.",
    "home.gallery.overlay.line2": "Premium.",
    "home.gallery.overlay.line3": "Prestazioni.",
    "home.gallery.overlay.text":
      "La GR1T G1 unisce ingegneria di precisione, durabilità, sicurezza e utilità in una macchina senza compromessi.",
    "home.gallery.card.smartTech.title": "Tecnologia Smart",
    "home.gallery.card.smartTech.description": "4G, sblocco keyless, ricarica wireless, app GR1T.",
    "home.gallery.card.utility.title": "Utilità",
    "home.gallery.card.utility.description": "Vani, portapacchi e batterie intercambiabili per l’uso quotidiano.",
    "home.gallery.card.materials.title": "Materiali Premium",
    "home.gallery.card.materials.description": "Leghe leggere e finiture raffinate fatte per durare.",
    "home.gallery.card.security.title": "Sicurezza",
    "home.gallery.card.security.description": "Telecamere, Wake-On-Shake, GPS e blocco remoto per protezione.",
    "cta.refundableLine": "100% rimborsabile. Senza rischio.",
    "cta.faqLabel": "FAQ.",
    "cta.termsLabel": "Termini.",
    "cta.andConnector": "e",
    "home.faq.title": "Domande frequenti",
    "home.faq.subtitle": "Domande? Abbiamo le risposte!",
    "home.faq.visitG1S": "Visita le specifiche della G1S Street",
    "home.faq.visitG1X": "Visita le specifiche della G1X Scrambler",
    "home.faq.licenseLabel": "patente",
    "home.specs.battery": "batteria",
    "home.specs.charging": "ricarica",
    "home.specs.payload": "carico utile",
    "checkout.breadcrumb": "Carrello > Pagamento e finanziamento",
    "checkout.orderSummary.title": "Riepilogo ordine",
    "checkout.payment.title": "Pagamento",
    "checkout.payment.description":
      "Pagamento sicuro direttamente sulla pagina tramite Stripe — paga con carta, Apple Pay, Google Pay, Klarna, Revolut Pay o Twint (la disponibilità dipende dalla tua area geografica e dalle impostazioni Stripe).",
    "checkout.express.title": "Checkout Rapido",
    "checkout.personal.title": "Dettagli personali",
    "checkout.card.title": "Dettagli carta",
    "checkout.badge.card": "CARTA",
    "checkout.badge.wallet": "Apple Pay",
    "checkout.placeholder.email": "Indirizzo email",
    "checkout.placeholder.phone": "Numero di telefono",
    "checkout.placeholder.company": "Nome dell’azienda",
    "checkout.placeholder.country": "Seleziona paese:",
    "checkout.placeholder.tshirt": "Taglia T‑shirt",
    "checkout.placeholder.address1": "Indirizzo 1",
    "checkout.placeholder.address2": "Indirizzo 2",
    "checkout.placeholder.firstName": "Nome",
    "checkout.placeholder.lastName": "Cognome",
    "checkout.placeholder.city": "Città",
    "checkout.summary.estimateLabel": "(prezzo di acquisto stimato)",
    "checkout.summary.dueToday": "Da pagare oggi",
    "checkout.summary.reservationLabel": "Prenotazione",
    "checkout.newsletter.label": "Iscriviti alla nostra newsletter",
    "checkout.agree.prefix": "Accetto la",
    "checkout.placeOrder": "Effettua ordine",
    "checkout.legal.note":
      "Effettuando una prenotazione completamente rimborsabile, accetti la Privacy Policy e i Termini e condizioni commerciali. Il deposito rimborsabile non garantisce una data di consegna specifica ed è soggetto a modifiche. Il prezzo finale del prodotto può variare.",
    "home.faq.cost.g1s": "G1S “Street”: Da €5,500 + IVA con prenotazione rimborsabile di €100 entro il 31.1.2026.",
    "home.faq.cost.g1s.list": "(Prezzo di listino: €7,000 + IVA)",
    "home.faq.cost.g1x": "G1X “Scrambler”: Da €6,500 + IVA con prenotazione rimborsabile di €100 entro il 31.1.2026.",
    "home.faq.cost.g1x.list": "(Prezzo di listino: €8,000 + IVA)",
    // FAQ question titles
    "home.faq.q.keySpecs": "Quali sono le principali specifiche?",
    "home.faq.q.range": "Qual è l'autonomia?",
    "home.faq.q.cost": "Quanto costano le moto?",
    "home.faq.q.license": "Che patente serve per guidarla?",
    "home.faq.q.removableBatteries": "Posso rimuovere le batterie per la ricarica?",
    "home.faq.q.chargeTime": "Quanto tempo serve per la ricarica?",
    "home.faq.q.carCharging": "Posso ricaricarla da una colonnina per auto?",
    "home.faq.q.motorway": "Posso andare in autostrada?",
    "home.faq.q.twoRiders": "È adatta a due passeggeri?",
    "home.faq.q.difference": "Cosa rende questa moto diversa dalle altre?",
    "home.faq.q.theftResistant": "È resistente al furto?",
    "home.faq.q.tyresWheels": "Che pneumatici e cerchi vengono utilizzati?",
    "home.faq.q.seeOrTest": "Dove posso vederla o provarla?",
    "home.faq.q.appLaunch": "L’app GR1T sarà disponibile al lancio?",
    "home.faq.q.warranty": "Che garanzia offre GR1T?",
    "home.faq.q.euHomologation": "La moto è omologata per le strade UE?",
    "home.faq.q.versions": "La moto è disponibile in diverse versioni?",
    "home.faq.q.colorsConfigs": "Quali colori e configurazioni sono disponibili?",
    "home.faq.q.order": "Come posso ordinare?",
    "home.faq.q.reservationProcess": "Come funziona la prenotazione?",
    "home.faq.q.deliveriesStart": "Quando inizieranno le consegne?",
    "home.faq.q.outsideEU": "E se vivo fuori dall’UE?",
    "home.faq.q.financing": "È disponibile il finanziamento?",
    // FAQ answers (IT)
    "home.faq.a.keySpecs.list.topSpeed": "Velocità massima: 130 km/h",
    "home.faq.a.keySpecs.list.range": "Autonomia: fino a 150 km",
    "home.faq.a.keySpecs.list.battery": "Doppia batteria rimovibile da 6 kWh",
    "home.faq.a.keySpecs.list.charging": "Ricarica: 2,5 ore fino all’80%, 3,2 ore fino al 100%",
    "home.faq.a.keySpecs.list.power": "Potenza: 11 kW nominali (125cc), 27 kW di picco (36 CV)",
    "home.faq.a.keySpecs.list.weight": "Peso: 127 kg (incluse le batterie)",
    "home.faq.a.keySpecs.list.payload": "Portata: 190 kg",
    "home.faq.a.keySpecs.list.license": "Patente: A1 o B (in alcuni Paesi)",
    "home.faq.a.range.p1":
      "A seconda della configurazione della batteria, dello stile di guida e del terreno, la G1 offre un’autonomia reale di 120–150 km (standard WMTC). Perfetta per gli spostamenti quotidiani in zone urbane e suburbane e i viaggi del weekend.",
    "home.faq.a.cost.list.g1s": 'G1S "Street": €6.999 + IVA',
    "home.faq.a.cost.list.g1x": 'G1X "Scrambler": €7.999 + IVA',
    "home.faq.a.cost.promo.p1":
      "I membri della Founder’s Circle ricevono uno sconto di €1.500 per prenotazioni effettuate entro il 31.1.2026.",
    "home.faq.a.cost.expectedTitle": "I prezzi di listino previsti sono:",
    "home.faq.a.cost.expected.g1s": "G1S “Street”: da €7,000 + IVA",
    "home.faq.a.cost.expected.g1x": "G1X “Scrambler”: da €8,000 + IVA",
    "home.faq.a.cost.discountIntro":
      "Con una prenotazione rimborsabile di €100 effettuata entro il 31.1.2026, si ottiene uno sconto di €1,500, che porta i prezzi di partenza a:",
    "home.faq.a.cost.discount.g1s": "G1S: da €5,500 + IVA",
    "home.faq.a.cost.discount.g1x": "G1X: da €6,500 + IVA",
    "home.faq.a.cost.finalNote": "Il prezzo finale può variare in base alle opzioni e alla configurazione scelte.",
    "home.faq.a.cost.linkText": "Scopri i privilegi del Founder’s Circle →",
    "home.faq.a.license.p1":
      "Con una potenza di 11 kW, equiparabile a un 125 cc, è richiesta la patente A1 o, in alcuni Paesi, la patente B. Ti consigliamo di verificare le leggi locali.",
    "home.faq.a.removableBatteries.p1":
      "Sì, le due batterie rimovibili permettono una ricarica facile e rapida ovunque ci sia una normale presa elettrica, sia a casa che al lavoro.",
    "home.faq.a.removableBatteries.list.6kwh": "2 × 3,0 kWh per un totale di 6,0 kWh",
    "home.faq.a.chargeTime.p1": "Circa 3,2 ore a 220V.",
    "home.faq.a.chargeTime.fastTopUp": "Una ricarica rapida dal 10 all’80% richiede normalmente 1,5–2,5 ore.",
    "home.faq.a.carCharging.p1":
      "Sì. Con l’adattatore Type 2 opzionale e il caricatore integrato, puoi collegare la G1 a qualsiasi stazione di ricarica standard per auto.",
    "home.faq.a.motorway.p1":
      "Sì. Con una velocità massima di 135 km/h, la G1 è perfettamente adatta a strade urbane e extraurbane.",
    "home.faq.a.twoRiders.p1":
      "Sì. La G1 è una due posti di serie, con sufficiente potenza e capacità di carico per trasportare due passeggeri (fino a 190 kg).",
    "home.faq.a.difference.list.1": "Progettata e ingegnerizzata nella Motor Valley italiana",
    "home.faq.a.difference.list.2": "Materiali premium",
    "home.faq.a.difference.list.3": "Sistema a doppia batteria rimovibile",
    "home.faq.a.difference.list.4": "Capacità di carico di 190 kg",
    "home.faq.a.difference.list.5": "Spazio sottosella da 9 litri",
    "home.faq.a.difference.list.6":
      "Tecnologia smart (dashboard 4G, CarPlay/Android Auto wireless, ricarica wireless, GPS, videocamera frontale)",
    "home.faq.a.difference.list.7": "Design modulare e personalizzabile",
    "home.faq.a.theftResistant.p1":
      "Sì – GPS, videocamera, blocco remoto e batterie rimovibili la rendono estremamente difficile da rubare.",
    "home.faq.a.tyresWheels.intro": 'Cerchi da 17".',
    "home.faq.a.tyresWheels.g1s": "G1S: Pirelli Angel City.",
    "home.faq.a.tyresWheels.g1x": "G1X: Metzeler Karoo Street.",
    "home.faq.a.tyres.frontLabel": "Anteriore",
    "home.faq.a.tyres.rearLabel": "Posteriore",
    "home.faq.a.seeOrTest.p1": "Saremo presenti al salone EICMA di Milano (Padiglione 9, Stand S57).",
    "home.faq.a.seeOrTest.p2": "Le prove su strada saranno organizzate tramite concessionari selezionati ed eventi dedicati.",
    "home.faq.a.appLaunch.p1": "Sì – con chiave digitale, tracciamento GPS, diagnosi, aggiornamenti OTA e altro.",
    "home.faq.a.warranty.list.1": "⁠2 anni su tutta la moto (chilometraggio illimitato)",
    "home.faq.a.warranty.list.2": "3 anni o 36.000 km su motore",
    "home.faq.a.warranty.list.3": "6 anni su batterie (capacità ≥80%)",
    "home.faq.a.euHomologation.p1": "Sì, sviluppata in conformità agli standard europei.",
    "home.faq.a.versions.p1": "Sì – una versione Street e una Scrambler.",
    "home.faq.a.colorsConfigs.p1": "Sono disponibili diverse opzioni per le fiancate e kit di accessori.",
    "home.faq.a.order.p1": "clicca qui per prenotare",
    "home.faq.a.reservationProcess.p1": "Vai alla pagina di prenotazione, seleziona il modello e versa un deposito di €100.",
    "home.faq.a.deliveriesStart.p1": "Nel 2027, dopo la conferma del finanziamento della produzione.",
    "home.faq.a.outsideEU.p1": "Puntiamo a lanciare prima nei principali mercati europei. Espanderemo Paese per Paese.",
    "home.faq.a.financing.p1":
      "Sì, stiamo lavorando con partner per offrire leasing o piani di pagamento mensile in determinati Paesi.",

    // Bikes
    "bikes.price": "€1200",
    "bikes.darkKnight": "Dark Knight",
    "bikes.streetMoto": "Street Moto",

    // About us
    "about.title": "Chi Siamo",
    "about.description":
      "GR1T è stata fondata sulla convinzione che le motociclette elettriche possano essere potenti, eleganti ed emozionanti. Spingendo i confini e aprendo nuovi terreni del domani.",
    "about.story.title": "La Nostra Storia",
    "about.story.part1":
      "Ciò che è iniziato come una conversazione tra amici di lunga data e imprenditori si è evoluto in un'azienda europea di motociclette elettriche con una missione chiara: creare motociclette elettriche costruite appositamente, ad alte prestazioni e splendidamente progettate per le città di domani.\n\nAbbiamo costruito più di una moto — abbiamo costruito una piattaforma.\n\nLe nostre motociclette non sono adattate da telai esistenti o forzate in stampi legacy. Sono progettate da zero con in mente i piloti urbani e suburbani. Con connettività digitale avanzata, componenti modulari e stile premium, ogni motocicletta GR1T riflette la nostra ossessione per la qualità, i dettagli e l'esperienza di guida.",
    "about.story.part2":
      "Al centro di tutto c'è GR1T — la mentalità, non solo il nome.\n\nCrediamo che la mobilità debba essere emozionante, responsabile ed espressiva. I nostri piloti non seguono il gregge — scelgono la loro linea, tracciano il loro percorso e guidano con uno scopo. Ecco perché abbiamo progettato le motociclette GR1T per essere personalizzabili, manutenibili e pronte per il futuro.",
    "about.story.tagline": "Ride GR1T.",
    "about.founders.title": "Incontra i Nostri Fondatori",
    "about.founders.background": "Background",
    "about.founders.omar.background":
      "Più di 20 anni nel Private Banking e Wealth Management, inclusi Commerzbank, BNP Paribas e Bank Cantonalede Geneve. Forte rete e contatti europei; esperienza in complesse operazioni commerciali.",
    "about.founders.philip.background":
      "Più di 30 anni nella Consulenza per gli Investimenti per investitori istituzionali, fondi, VC e PE in vari settori tra cui automotive, energia, costruzioni e tecnologia. Oltre € 7,0 miliardi in transazioni completate.",
    "about.founders.jamal.background":
      "Più di 30 anni nella Consulenza per gli Investimenti per investitori istituzionali, fondi, VC e PE in vari settori tra cui automotive, energia, costruzioni e tecnologia. Oltre € 7,0 miliardi in transazioni completate.",

    // Contact
    "contact.title": "Contatti",
    "contact.description":
      "Che tu sia un pilota, un investitore o un partner, siamo qui per parlare. Inviaci un messaggio e il nostro team ti risponderà il prima possibile.",
    "contact.form.name": "Nome",
    "contact.form.email": "Email",
    "contact.form.message": "Messaggio",
    "contact.form.submit": "Invia Messaggio",
    "contact.form.firstName": "Nome",
    "contact.form.lastName": "Cognome",
    "contact.form.sending": "Invio in corso...",
    "contact.form.send": "Invia",
    "contact.workTogether": "Lavoriamo Insieme",
    "contact.generalEnquiries": "Richieste Generali",
    "contact.pressEnquiries": "Richieste Stampa",
    "contact.pressDescription":
      "Accogliamo tutte le richieste stampa qualificate. Per saperne di più su GR1T, i nostri valori e il nostro percorso, contattaci.",
    "contact.socialMedia": "Social Media",
    "contact.successMessage": "Grazie! Il tuo messaggio è stato inviato con successo.",
    "contact.errorMessage": "Si è verificato un problema nell'invio del messaggio. Riprova.",
    "contact.getInTouch": "Mettiti in Contatto!",

    // News
    "news.title": "Tutte le Notizie",
    "news.description": "Rimani aggiornato con gli ultimi sviluppi, annunci e storie da GR1T Motorcycles.",
    "news.readMore": "Leggi di più",
    "news.backToNews": "← Torna alle Notizie",
    "news.loading": "Caricamento articolo...",
    "news.notFound": "Articolo non trovato.",
    "news.views": "visualizzazioni",
    "news.comments": "commenti",
    "news.by": "Di",

    // Footer
    "footer.rights": "Tutti i Diritti Riservati",
    "footer.privacy": "Politica sulla Privacy",
    "footer.terms": "Termini di Servizio",
    "footer.legal": "Legale",
    "footer.workWithUs": "Lavora con Noi",
    "footer.warranty": "Garanzia",
    "footer.reservationTerms": "Termini di Prenotazione",
    "footer.newsletter.title": "Rimani in contatto",
    "footer.newsletter.description": "Iscriviti alla newsletter ed entra nell’Inner Circle oggi!",
    "footer.newsletter.joinNow": "Iscriviti ora!",
    "footer.newsletter.success": "Iscrizione completata. Controlla la tua casella email.",
    "footer.newsletter.networkError": "Errore di rete. Riprova.",

    // Language toggle
    language: "Lingua",
    "language.english": "English",
    "language.italian": "Italiano",

    // Common
    "common.readMore": "Leggi di più",
    "common.getInTouch": "Contattaci",
    "common.loading": "Caricamento...",
    "common.error": "Si è verificato un errore. Per favore riprova.",
    "common.reserveNow": "Prenota Ora",
    "common.explore": "Esplora",
    "common.privacyPolicy": "Politica sulla Privacy",
    "common.termsOfUse": "Termini di Utilizzo",

    // CTA page
    "cta.hero.title": "Iscriviti alla nostra Newsletter",
    "cta.hero.subtitle": "Rimani aggiornato su lanci di prodotto e offerte speciali.",
    "cta.hero.button": "Iscriviti",
    "cta.modal.title": "Unisciti alla nostra Newsletter",
    "cta.modal.subtitle": "Rimani aggiornato su lanci di prodotto e offerte speciali.",
    "cta.form.namePlaceholder": "Il tuo nome",
    "cta.form.countryPlaceholder": "Seleziona il paese...",
    "cta.form.noResults": "Nessun risultato",
    "cta.form.emailPlaceholder": "Inserisci la tua email",
    "cta.form.submit": "Iscriviti",
    "cta.form.submitting": "Invio...",
    "cta.form.emailRequired": "L'email è obbligatoria",
    "cta.form.emailInvalid": "Per favore inserisci un indirizzo email valido.",
    "cta.success": "Iscrizione completata. Ritorno alla schermata iniziale…",
    "cta.error.generic": "Iscrizione non riuscita",
    "cta.privacy": "Iscrivendoti accetti la nostra",
    "cta.success.title": "Sei iscritto!",
    "cta.success.description": "Grazie per esserti unito alla nostra newsletter. Vuoi prenotare ora la tua GR1T?",
    "cta.success.notNow": "Non ora",
    "cta.success.reserveNowCta": "Prenota la tua GR1T",
    "cta.choose.title": "Scegli la tua GR1T",
    "cta.choose.description": "Seleziona un modello per continuare.",
    "cta.choose.back": "Indietro",
    "cta.promo.foundersTitle": "Iscriviti al GR1T Founder’s Club e ricevi uno sconto di €1.500 sulla tua prima moto.",

    // Promo popup
    "promo.popup.title": "Unisciti alla Founder’s Circle  ",
    "promo.popup.discount": "Sconto di €1.500",
    "promo.popup.depositLine": "Prenota la tua moto con un deposito di €100",
    "promo.popup.refundableLine": "100% rimborsabile. 0% rischio.",
    "promo.popup.closeAriaLabel": "Chiudi promozione",
    "common.details": "Dettagli",

    // EICMA page
    "eicma.work.title": "Lavora con Noi",
    "eicma.work.description":
      "Se sei interessato a collaborare con GR1T Motorcycles come distributore, ci farebbe piacere sentirti!",
    "eicma.meetUsTitle": "Incontraci a EICMA",
    "eicma.meetUsDetails": "Padiglione 9 Stand S57 | 4 - 9 Novembre 2025",
    "eicma.tagline": "Esposizione Internazionale Delle Due Ruote",

    // Tech page
    "tech.hero.title": "LA POTENZA DEL SILENZIO",
    "tech.hero.subtitle":
      "Un design innovativo e le tecnologie più all’avanguardia si uniscono per offrire prestazioni senza compromessi.",
    "tech.sections.smartTech": "TECNOLOGIA SMART",
    "tech.sections.cameras": "TELECAMERE",
    "tech.sections.everyday": "PRATICITÀ QUOTIDIANA",
    "tech.sections.crafted": "PRESTAZIONI ARTIGIANALI",
    "tech.smart.display.title": 'Display connesso 4G da 5"',
    "tech.smart.display.description":
      "Completo controllo dei dati tecnici e di guida in tempo reale grazie al display da 5 pollici che integra in modalità wireless Apple CarPlay e Android Auto. Naviga, gestisci le chiamate e accedi alle funzioni principali in modo fluido e sicuro. Con la connettività 4G integrata, la tua moto diventerà sempre più precisa ed efficiente per assisterti in ogni aspetto della guida.",
    "tech.smart.charger.title": "Caricatore wireless e porta USB-C",
    "tech.smart.charger.description":
      "Il comodo vano portaoggetti presente sopra il pacco batterie ospita una base di ricarica wireless e una porta USB-C, permettendoti durante ogni corsa di mantenere i tuoi dispositivi sempre alimentati. Che si tratti del telefono, degli auricolari o di un accessorio, la ricarica è semplice, immediata e sempre a portata di mano.",
    "tech.smart.keyless.title": "Sblocco keyless GR1T",
    "tech.smart.keyless.description":
      "Al fine di rendere l’esperienza con GR1T ancora più sicura e moderna la moto presenta uno sblocco automatico non appena ti avvicini — niente più chiavi. Sbloccare la motocicletta potrà esser fatto anche tramite l’accesso su smartphone o smartwatch.",
    "tech.smart.app.title": "App GR1T",
    "tech.smart.app.description":
      "Monitora i tuoi percorsi, controlla lo stato della batteria, esegui diagnosi e ricevi notifiche di manutenzione predittiva — tutto direttamente dall’app GR1T. Tramite l’app avrai accesso al supporto quando serve, offrendoti un pieno controllo e totale tranquillità in ogni viaggio.",
    "tech.cameras.frontRear.title": "Telecamere anteriori e posteriori",
    "tech.cameras.frontRear.description":
      "Le doppie telecamere registrano ogni viaggio in loop continuo, con opzione di archiviazione nel cloud per salvare o condividere i tuoi percorsi. Tutto questo per renderti consapevole che ogni momento passato in sella alla tua moto sarà registrato in tutela della tua sicurezza — una novità assoluta in questa categoria.",
    "tech.cameras.security.title": "Sicurezza intelligente",
    "tech.cameras.security.description":
      "Una telecamera frontale si attiva automaticamente se la moto viene spostata senza la tua chiave o il tuo dispositivo nelle vicinanze, registrando tutto ciò che accade. Con GPS integrato, blocco remoto e notifiche istantanee rimarrai sempre a conoscenza della posizione del veicolo, ovunque tu sia. È un sistema di protezione intelligente, pensato per garantirti serenità totale.",
    "tech.everyday.storage.title": "Vano sottosella da 9 litri",
    "tech.everyday.storage.description":
      "Un vano da 9 litri sotto la sella ti permette di portare con te gli oggetti essenziali, uno zaino o persino il caricatore di bordo e il cavo di ricarica. Progettato per un uso pratico e quotidiano, dimostra che le prestazioni elettriche possono convivere perfettamente con la comodità.",
    "tech.everyday.racks.title": "Portapacchi posteriore e laterali",
    "tech.everyday.racks.description":
      "Ogni portapacchi ha una capacità di 10 kg — ideale per il casco, oggetti personali e attrezzatura da lavoro. Robusti e raffinati nello stile, ampliano la versatilità della moto senza comprometterne l’equilibrio o il design.",
    "tech.everyday.batteries.title": "2 Batterie rimovibili",
    "tech.everyday.batteries.description":
      "I pacchi batteria si inseriscono perfettamente nel telaio e possono essere rimossi e ricaricati a casa, in ufficio o ovunque ti trovi. Con una capacità fino a 6 kWh, sei tu a decidere quanta autonomia e flessibilità richiede il tuo stile di vita.",
    "tech.everyday.onboardCharger.title": "Caricatore di bordo",
    "tech.everyday.onboardCharger.description":
      "Il caricatore integrato utilizza un sistema magnetico di aggancio sicuro, progettato per restare stabile in ogni condizione. La presa di ricarica è posizionata in modo pratico, così da collegare solo un cavo e ricaricare in maniera sicura e rapida la motocicletta anche in movimento.",
    "tech.everyday.chargeAnywhere.title": "Ricarica ovunque",
    "tech.everyday.chargeAnywhere.description":
      "Collega e ricarica dove vuoi. Grazie al caricatore di bordo integrato e alla presa esterna accessibile, puoi collegarti facilmente alle colonnine pubbliche o prese domestiche standard. Non serve rimuovere le batterie — basta parcheggiare, collegare e ripartire in totale comodità.",
    "tech.crafted.materials.title": "Materiali premium",
    "tech.crafted.materials.description":
      "Dai componenti in alluminio leggero alla sella ergonomica e raffinata, ogni elemento è scelto con cura per offrire qualità e durata. Costruita per resistere all’uso quotidiano ma con un tocco premium, la moto trasmette una sensazione di solidità e attenzione ai dettagli in ogni curva.",
    "tech.crafted.belt.title": "Trasmissione a cinghia",
    "tech.crafted.belt.description":
      "La trasmissione a cinghia sostituisce la catena tradizionale con un sistema progettato per durare nel tempo e ridurre al minimo la manutenzione. Silenziosa, fluida e affidabile, garantisce anni di guida senza pensieri, così puoi concentrarti solo sulla strada.",
    "tech.crafted.wheels.title": 'Ruote da 17"',
    "tech.crafted.wheels.description":
      "Equipaggiate con pneumatici Pirelli o Metzeler di alta gamma, le ruote da 17 pollici offrono stabilità, trazione e precisione su ogni superficie. Dalle curve cittadine alle strade aperte, assicurano una guida sicura, stabile e sempre sotto controllo.",
    "tech.crafted.regenerative.title": "Recupero",
    "tech.crafted.regenerative.description":
      "La frenatura rigenerativa trasforma ogni decelerazione in energia utile, aumentando l’autonomia rendendo ogni viaggio più efficiente.",
    // G1S page
    "g1s.hero.title": "G1S Street",
    "g1s.hero.subtitle": "Progettata per seguire il battito della città",
    "g1s.about.title":
      "La G1S non è solo un’altra moto elettrica — è un nuovo modo di vivere la strada. Leggera, elegante e pensata per la vita in città.",
    "g1s.about.description":
      "Progettata e ingegnerizzata nella Motor Valley italiana, è una motocicletta tanto intelligente quanto sostenibile.",
    "g1s.cta.title": "Sii il primo. Risparmia di più.",
    "g1s.cta.discountLine":
      "Prenotando subito una motocicletta nella nostra lista d’attesa esclusiva riceverai uno sconto di fabbrica di €1.500 sul prezzo base di €6.999.",
    "g1s.cta.joinFounders": "Entra a far parte della nostra Founder’s Circle e approfitta di questa straordinaria offerta.",
    "g1s.cta.price.regularLabel": "Prezzo di listino",
    "g1s.cta.price.regularValue": "€6.999",
    "g1s.cta.price.untilLabel": "Solo fino al 31.1.2026",
    "g1s.cta.price.discountValue": "€5.499",
    "g1s.reserving.title": "Prenotare è semplice",
    "g1s.reserving.subtitle":
      "Se non dovessimo entrare in produzione, o se cambi idea, verrai rimborsato interamente. Nessun rischio, nessuna clausola nascosta.",
    "g1s.reserving.card1": "Prenota oggi con un deposito rimborsabile di €100.",
    "g1s.reserving.card2": "Personalizza la tua moto all’inizio della produzione.",
    "g1s.reserving.card3": "Ordina entro il 31 Gennaio e otterrai la priorità nella spedizione.",
    "g1s.specs.title": "Specifiche G1S",
    "g1s.specs.technicalTitle": "G1S – Specifiche Tecniche",
    "g1s.specs.range.title": "Autonomia",
    "g1s.specs.range.summary": "Città: 150 km",
    "g1s.specs.powertrain.title": "Gruppo propulsore",
    "g1s.specs.powertrain.summary": "Motore: brushless IPM a flusso radiale, raffreddato ad aria",
    "g1s.specs.license.title": "Patente",
    "g1s.specs.license.summary": "A1/B",
    "g1s.specs.batteries.title": "Batterie",
    "g1s.specs.batteries.summary": "Capacità nominale: 5,92 kWh totali (2,96 kWh x 2)",
    "g1s.specs.chassis.title": "Telaio",
    "g1s.specs.chassis.summary": "Sospensione anteriore: forcelle a cartuccia rovesciate ø 41 mm",
    "g1s.specs.dimensions.title": "Dimensioni",
    "g1s.specs.dimensions.summary": "Interasse: 1.345 mm",
    "g1s.specs.weight.title": "Peso",
    "g1s.specs.weight.summary": "127 kg incl. batteria (94 kg senza batteria)",
    "g1s.specs.ridingModes.title": "Modalità di guida",
    "g1s.specs.ridingModes.summary": "Città, Performance, Walk, Reverse",
    "g1s.specs.performance.title": "Prestazioni",
    "g1s.specs.performance.summary": "Potenza continua: 11 kW – 56 Nm a 3200 RPM",
    "g1s.specs.startingPrice.title": "Prezzo di partenza",
    "g1s.specs.startingPrice.summary": "€ 7,000 + IVA",
    "g1s.specs.warranty.title": "Garanzia",
    "g1s.specs.warranty.summary": "Motocicletta: 2 anni (km illimitati)",
    // G1S warranty detailed copy (IT)
    "g1s.specs.warranty.intro": "La tua moto GR1T è coperta da una garanzia completa:",
    "g1s.specs.warranty.motorcycleYears": "- 2 anni su tutta la moto (chilometraggio illimitato)",
    "g1s.specs.warranty.batteryYears": "- 6 anni sulle batterie (≥70% di capacità garantita)",
    "g1s.specs.warranty.coverage":
      "Copriamo i difetti di fabbricazione sui principali sistemi, inclusi telaio, impianto elettrico, gestione termica e sistema di ricarica.",
    "g1s.specs.warranty.offroad":
      "L’uso fuoristrada è coperto (se configurato per esso) e la garanzia è trasferibile gratuitamente all’interno dell’UE/SEE.",
    "g1s.specs.warranty.linkText": "Per termini completi ed esclusioni, visita la nostra",
    // G1S specs detailed lines (IT)
    "g1s.specs.range.combined": "Combinato città/autostrada: 120 km",
    "g1s.specs.performance.continuousPower": "Potenza continua: 11 kW – 56 Nm @ 3200 RPM",
    "g1s.specs.performance.topSpeedMax": "Velocità massima (picco): 130 km/h",
    "g1s.specs.performance.topSpeedSustained": "Velocità massima (sostenuta): 120 km/h",
    "g1s.specs.performance.peakTorque": "Coppia massima: 85 Nm",
    "g1s.specs.performance.peakPower": "Potenza di picco: 26,6 kW",
    "g1s.specs.weight.totalWithBattery": "Peso totale (inclusa batteria): 127 kg",
    "g1s.specs.weight.withoutBattery": "Peso senza batteria: 94 kg",
    "g1s.specs.weight.maxCarryingCapacity": "Capacità di carico massima: 190 kg",
    "g1s.specs.powertrain.motorDescription":
      "Descrizione motore: Motore brushless a magneti permanenti interni, flusso radiale, raffreddamento passivo ad aria",
    "g1s.specs.powertrain.controller": "Centralina: Controller brushless trifase da 400 amp con decelerazione rigenerativa",
    "g1s.specs.powertrain.voltage": "Tensione: 74 V",
    "g1s.specs.license.details":
      "Patente A1/B – Consulta la tabella per le informazioni sui requisiti di licenza nel tuo Paese. Rivolgiti sempre alle autorità locali per conferma.",
    "g1s.specs.batteries.weight": "Peso batteria: 2 x 16,5 kg",
    "g1s.specs.batteries.chemistry": "Chimica batteria: 8P20S NMC – 10C ad alta scarica (74 V 40 AH)",
    "g1s.specs.chassis.frontSuspension": "Sospensione anteriore: Forcella a cartuccia rovesciata Ø 41 mm",
    "g1s.specs.chassis.rearSuspension":
      "Sospensione posteriore: Ammortizzatore orizzontale Ø 40 mm con precarico molla regolabile",
    "g1s.specs.chassis.frontWheelTravel": "Escursione ruota anteriore: 120 mm",
    "g1s.specs.chassis.rearWheelTravel": "Escursione ruota posteriore: 120 mm",
    "g1s.specs.chassis.frontBrakes": "Freno anteriore: Pinza a quattro pistoncini, disco 320 x 5 mm",
    "g1s.specs.chassis.rearBrakes": "Freno posteriore: Pinza a doppio pistoncino, disco 240 x 4,5 mm",
    "g1s.specs.chassis.frontTyre": "Pneumatico anteriore: Pirelli Angel City 110/70-17”",
    "g1s.specs.chassis.rearTyre": "Pneumatico posteriore: Pirelli Angel City 150/60-17”",
    "g1s.specs.chassis.frontWheel": "Cerchio anteriore: 3,00” x 17”",
    "g1s.specs.chassis.rearWheel": "Cerchio posteriore: 4,00” x 17”",
    "g1s.specs.dimensions.seatHeight": "Altezza sella: 810 mm",
    "g1s.specs.dimensions.rake": "Inclinazione cannotto (rake): 23°",
    "g1s.specs.dimensions.trail": "Avancorsa (trail): 87,2 mm",
    "g1s.specs.ridingModes.city": "City: 11 kW di potenza di picco",
    "g1s.specs.ridingModes.performance": "Performance: 26,6 kW di picco / 11 kW continui",
    "g1s.specs.ridingModes.walk": "Walk: velocità limitata a 3 km/h",
    "g1s.specs.ridingModes.reverse": "Reverse: velocità limitata a 3 km/h",
    // 360 stats missing label (IT)
    "g1s.stats.removableBatteriesLabel": "Batterie rimovibili",
    "g1s.stats.rangeLabel": "Autonomia",
    "g1s.stats.topSpeedLabel": "Velocità massima",
    "g1s.stats.carryingCapacityLabel": "Capacità di carico",
    "g1s.stats.nominalPowerLabel": "Potenza nominale",
    "g1s.stats.peakPowerLabel": "Potenza di picco",

    // G1X page (IT)
    "g1x.specs.title": "Specifiche G1X",
    "g1x.specs.technicalTitle": "G1X – Specifiche Tecniche",
    "g1x.specs.range.title": "Autonomia",
    "g1x.specs.range.summary": "Città: 150 km",
    "g1x.specs.range.combined": "Combinato città/autostrada: 120 km",
    "g1x.specs.powertrain.title": "Gruppo propulsore",
    "g1x.specs.powertrain.summary": "Motore: brushless IPM a flusso radiale, raffreddato ad aria",
    "g1x.specs.powertrain.motorDescription":
      "Descrizione motore: Motore brushless a magneti permanenti interni, flusso radiale, raffreddamento passivo ad aria",
    "g1x.specs.powertrain.controller": "Centralina: Controller brushless trifase da 400 amp con decelerazione rigenerativa",
    "g1x.specs.powertrain.voltage": "Tensione: 74 V",
    "g1x.specs.license.title": "Patente",
    "g1x.specs.license.summary": "A1/B",
    "g1x.specs.license.details":
      "Patente A1/B – Consulta la tabella per le informazioni sui requisiti di licenza nel tuo Paese. Rivolgiti sempre alle autorità locali per conferma.",
    "g1x.specs.batteries.title": "Batterie",
    "g1x.specs.batteries.summary": "Capacità nominale: 5,92 kWh totali (2,96 kWh x 2)",
    "g1x.specs.batteries.weight": "Peso batteria: 2 x 16,5 kg",
    "g1x.specs.batteries.chemistry": "Chimica batteria: 8P20S NMC – 10C ad alta scarica (74 V 40 AH)",
    "g1x.specs.chassis.title": "Telaio",
    "g1x.specs.chassis.summary": "Sospensione anteriore: forcelle a cartuccia rovesciate ø 41 mm",
    "g1x.specs.chassis.rearSuspension": "Sospensione posteriore: Ammortizzatore con pistone ø 40 mm e precarico molla regolabile",
    "g1x.specs.chassis.frontWheelTravel": "Escursione ruota anteriore: 120 mm",
    "g1x.specs.chassis.rearWheelTravel": "Escursione ruota posteriore: 120 mm",
    "g1x.specs.chassis.frontBrakes": "Freno anteriore: Pinza a quattro pistoncini, disco 320 x 5 mm",
    "g1x.specs.chassis.rearBrakes": "Freno posteriore: Pinza a doppio pistoncino, disco 240 x 4,5 mm",
    "g1x.specs.chassis.frontTyre": "Pneumatico anteriore: Metzeler Karoo Street 110/70-17”",
    "g1x.specs.chassis.rearTyre": "Pneumatico posteriore: Metzeler Karoo Street 140/70-17”",
    "g1x.specs.chassis.frontWheel": "Cerchio anteriore: 3,00” x 17”",
    "g1x.specs.chassis.rearWheel": "Cerchio posteriore: 4,00” x 17”",
    "g1x.specs.dimensions.title": "Dimensioni",
    "g1x.specs.dimensions.summary": "Interasse: 1.345 mm",
    "g1x.specs.dimensions.seatHeight": "Altezza sella: 830 mm",
    "g1x.specs.dimensions.rake": "Inclinazione cannotto (rake): 23°",
    "g1x.specs.dimensions.trail": "Avancorsa (trail): 87,2 mm",
    "g1x.specs.weight.title": "Peso",
    "g1x.specs.weight.summary": "127 kg incl. batteria (94 kg senza batteria)",
    "g1x.specs.weight.maxCarryingCapacity": "Capacità di carico massima: 190 kg",
    "g1x.specs.ridingModes.title": "Modalità di guida",
    "g1x.specs.ridingModes.summary": "Città, Performance, Walk, Reverse",
    "g1x.specs.ridingModes.city": "City: 11 kW di potenza di picco",
    "g1x.specs.ridingModes.performance": "Performance: 26,6 kW di picco / 11 kW continui",
    "g1x.specs.ridingModes.walk": "Walk: velocità limitata a 3 km/h",
    "g1x.specs.ridingModes.reverse": "Reverse: velocità limitata a 3 km/h",
    "g1x.specs.performance.title": "Prestazioni",
    "g1x.specs.performance.summary": "Potenza continua: 11 kW – 56 Nm a 3200 RPM",
    "g1x.specs.performance.topSpeedMax": "Velocità massima (picco): 130 km/h",
    "g1x.specs.performance.topSpeedSustained": "Velocità massima (sostenuta): 120 km/h",
    "g1x.specs.performance.peakTorque": "Coppia massima: 85 Nm",
    "g1x.specs.performance.peakPower": "Potenza di picco: 26,6 kW",
    "g1x.specs.startingPrice.title": "Prezzo di partenza",
    "g1x.specs.startingPrice.summary": "€ 8,000 + IVA",
    "g1x.specs.warranty.title": "Garanzia",
    "g1x.specs.warranty.summary": "Motocicletta: 2 anni (km illimitati)",
    "g1x.specs.warranty.intro": "La tua moto GR1T è coperta da una garanzia completa:",
    "g1x.specs.warranty.motorcycleYears": "- 2 anni su tutta la moto (chilometraggio illimitato)",
    "g1x.specs.warranty.powertrainYears": "- 3 anni o 36.000 km su gruppo propulsore e batterie (≥70% di capacità garantita)",
    "g1x.specs.warranty.coverage":
      "Copriamo i difetti di fabbricazione sui principali sistemi, inclusi telaio, impianto elettrico, gestione termica e sistema di ricarica.",
    "g1x.specs.warranty.offroad":
      "L’uso fuoristrada è coperto (se configurato per esso) e la garanzia è trasferibile gratuitamente all’interno dell’UE/SEE.",
    "g1x.specs.warranty.linkText": "Per termini completi ed esclusioni, visita la nostra",
    "g1x.specs.warranty.linkLabel": "Pagina Garanzia",
    "g1x.stats.rangeLabel": "Autonomia",
    "g1x.stats.topSpeedLabel": "Velocità massima",
    "g1x.stats.carryingCapacityLabel": "Capacità di carico",
    "g1x.stats.nominalPowerLabel": "Potenza nominale",
    "g1x.stats.peakPowerLabel": "Potenza di picco",
    "g1x.stats.removableBatteriesLabel": "Batterie rimovibili",
    // G1X hero/about/reserving/cta (IT)
    "g1x.hero.title": "G1X Scrambler",
    "g1x.hero.subtitle": "Per chi ama prendere la strada più lunga per tornare a casa",
    "g1x.about.header.line1": "Il G1X domina",
    "g1x.about.header.line2": "le strade e sfida i sentieri.",
    "g1x.about.header.line3": "Aggressivo, audace,",
    "g1x.about.header.line4": "costruito per andare oltre.",
    "g1x.about.description":
      "Il G1X è pensato per chi vuole il meglio di entrambi i mondi: agilità in città e grinta da scrambler.",
    "g1x.reserving.title": "Prenotare è semplice",
    "g1x.reserving.subtitle":
      "Se non dovessimo entrare in produzione, o se cambi idea, verrai rimborsato interamente. Nessun rischio, nessuna clausola nascosta.",
    "g1x.reserving.card1": "Prenota oggi con un deposito rimborsabile di €100.",
    "g1x.reserving.card2": "Personalizza la tua moto quando inizia la produzione.",
    "g1x.reserving.card3": "Ordina entro il 31 Gennaio e ottieni spedizione prioritaria.",
    "g1x.cta.title": "Sii il primo. Risparmia di più.",
    "g1x.cta.copy1.prefix": "Prenota una GR1T nella nostra lista d’attesa esclusiva e ricevi uno sconto di fabbrica di",
    "g1x.cta.copy1.suffix": "dal prezzo base di",
    "g1x.cta.joinFounders": "Entra nella Founder’s Circle e approfitta di questo prezzo unico e irripetibile.",
    "g1x.cta.price.regularLabel": "Prezzo di listino",
    "g1x.cta.price.untilLabel": "Solo fino al 31.1.2026",

    // Quality page (IT)
    "quality.homologation.title": "Omologazione",
    "quality.homologation.p1":
      "Le motociclette GRT saranno omologate e certificate per l’uso nell’Unione Europea dal nostro impianto di produzione. L’omologazione è il processo mediante il quale le nostre operazioni di produzione e i modelli di serie vengono certificati per l’uso sulle strade europee. L’omologazione di GRT Motorcycles è coperta dalla normativa europea WVTA (Whole Vehicle Type Approval) Regolamento (UE) 168/2013. Secondo il nostro attuale programma, ciò significa che sia i modelli street che scrambler saranno omologati e autorizzati alla circolazione su strade e autostrade dell’UE entro la fine del 2026.",
    "quality.qualityStandards.title": "Standard di Qualità",
    "quality.qualityStandards.p1":
      "Tutte le nostre parti, sia quelle fornite da terzi sia quelle prodotte internamente, sono certificate secondo la marcatura CE. Se hai riscontrato un difetto tecnico o desideri segnalare un problema di qualità, contatta il nostro Servizio Clienti: saremo lieti di aiutarti.",
    "quality.qualityStandards.p2":
      "In GR1T Motorcycles stiamo portando avanti un processo di certificazione della qualità in base ai seguenti standard nel 2026 e inizio 2027:",
    "quality.qualityStandards.list.1": "ISO 9001: Sistemi di Gestione per la Qualità",
    "quality.qualityStandards.list.2": "ISO 14001: Sistemi di Gestione Ambientale",
    "quality.qualityStandards.list.3": "IATF 16949: Sistemi Qualità per l’Automotive",
    "quality.qualityStandards.list.4": "ISO 26262: Sicurezza Funzionale dei Veicoli Stradali",
    "quality.qualityStandards.list.5": "ISO / SAE 21434: Cybersecurity per i Veicoli",
    "quality.qualityStandards.list.6": "ISO / IEC 27001: Sistemi di Gestione della Sicurezza delle Informazioni",
    "quality.customerService.title": "Servizio Clienti",
    "quality.customerService.p1":
      "Ci impegniamo a garantire un’eccellente qualità non solo nel design e nella produzione, ma anche nel servizio clienti. Se hai un reclamo o un problema relativo alla qualità, puoi:",
    "quality.customerService.list.1": "Come cliente, aprire un ticket di supporto online;",
    "quality.customerService.list.2": "Presentare un reclamo online",
    "quality.customerService.list.3": "Parlare con il nostro centro assistenza clienti;",
    "quality.customerService.list.4":
      "Interfacciarti con il distributore da cui hai acquistato la tua motocicletta GR1T, se pertinente.",
    "quality.customerService.p2": "Puoi anche contattarci sui social media se ti è più comodo.",
    "quality.batteryReplacement.title": "Sostituzione Batterie",
    "quality.batteryReplacement.p1":
      "Tutte le batterie GR1T sono prodotte da un fornitore terzo. Offriamo una garanzia che prevede la sostituzione gratuita da parte di GR1T di qualsiasi batteria che, entro i primi sei anni dalla data di acquisto, scenda sotto l’ottanta per cento della capacità massima di carica.",
    "quality.batteryReplacement.p2":
      "Per usufruire della garanzia, è necessario restituire a GR1T le batterie esistenti affinché possano essere riciclate oppure riparate e riutilizzate.",
    "quality.batteryReplacement.list.1":
      "installazione non corretta, incluso l’utilizzo su un veicolo o per un’applicazione diversa da quella prevista",
    "quality.batteryReplacement.list.2":
      "danni fisici come crepe, perdite, deformazioni dell’involucro, danni da impatto, immersione in acqua, incendio o esposizione a sostanze chimiche",
    "quality.batteryReplacement.list.3":
      "uso improprio o negligente, compresi sovraccarica, sottocarica, scarica profonda prolungata o utilizzo di sistemi di ricarica non specificati",
    "quality.batteryReplacement.list.4":
      "utilizzo di componenti non approvati, modifiche o riparazioni eseguite da personale non autorizzato",
    "quality.batteryReplacement.list.5":
      "mancata manutenzione ordinaria o mancata osservanza delle istruzioni contenute nel Manuale del Proprietario",
    "quality.batteryReplacement.list.6":
      "stoccaggio o trasporto al di fuori delle condizioni di temperatura, umidità o livello di carica specificate dal produttore",
    "quality.batteryReplacement.list.7":
      "trasferimento della batteria dal veicolo originale a un altro veicolo, salvo esplicita autorizzazione",
    "quality.batteryReplacement.p3": "La garanzia non è applicabile nei seguenti casi:",
    "quality.batteryReplacement.p4":
      "In caso di richiesta di garanzia, la batteria deve essere restituita a un Rivenditore o Installatore autorizzato per le verifiche e l’eventuale sostituzione. È necessario fornire la prova di acquisto o un documento che consenta di verificare la proprietà. I costi di spedizione e restituzione delle batterie sono a carico del Proprietario del Motociclo.",
    "quality.batteryReplacement.p5": "Qualsiasi batteria sostituita diventa di proprietà di GR1T.",
    "quality.logistics.title": "Logistica e Consegna",
    "quality.logistics.p1":
      "Sebbene abbiamo un numero limitato di motociclette disponibili per l’acquisto presso i nostri distributori, la vera emozione in GR1T nasce dall’ordinare e configurare la tua motocicletta.",
    "quality.logistics.p2":
      "Una volta costruita e testata, riceverai una notifica per confermare l’indirizzo di consegna. Le nostre motociclette possono essere consegnate:",
    "quality.logistics.list.1": "Direttamente a te",
    "quality.logistics.list.2": "Alla nostra rete di negozi GR1T",
    "quality.logistics.list.3": "Al distributore da cui hai acquistato la motocicletta.",
    "quality.logistics.list.4":
      "La consegna è gestita tramite corrieri affidabili e potrai tracciare ogni fase della spedizione.",
    "quality.hero.title": "Qualità",
    "quality.hero.p1":
      "La qualità in GR1T va oltre l’ingegneria: è una promessa. Ogni motocicletta è supportata da standard rigorosi, scelte sostenibili e un servizio dedicato, così puoi guidare con fiducia oggi e domani.",

    // Warranty page (IT)
    "quality.warranty.hero.title": "Condizioni di Garanzia",
    "quality.warranty.hero.p1":
      "Quando acquisti una motocicletta GR1T, ottieni più della sola ingegneria all’avanguardia. Ottieni anche il nostro impegno a supportare la tua moto.",
    "quality.warranty.terms.cover.title": "Cosa copriamo",
    "quality.warranty.terms.cover.p1": "Copriamo i difetti di fabbricazione sui seguenti componenti:",
    "quality.warranty.terms.cover.list.1": "Telaio e chassis (difetti di fabbricazione)",
    "quality.warranty.terms.cover.list.2": "Sistemi elettrici e cablaggi",
    "quality.warranty.terms.cover.list.3": "Sistema di gestione termica",
    "quality.warranty.terms.cover.list.4": "Apparecchiatura di ricarica a bordo fornita da GR1T",
    "quality.warranty.terms.exclusions.title": "Cosa non copriamo",
    "quality.warranty.terms.exclusions.list.1":
      "Parti soggette a usura come pneumatici, pastiglie freno, catene, cinghie, corone, lampadine e rivestimenti sella",
    "quality.warranty.terms.exclusions.list.2":
      "Danni da incidenti, uso in gara o competizione, acrobazie, uso improprio o cattiva conservazione",
    "quality.warranty.terms.exclusions.list.3": "Danni da immersione in acqua o utilizzo in condizioni meteorologiche estreme",
    "quality.warranty.terms.exclusions.list.4": "Modifiche o riparazioni con parti o software non approvati",
    "quality.warranty.terms.exclusions.list.5": "Ricarica o conservazione al di fuori delle linee guida pubblicate da GR1T",
    "quality.warranty.terms.offroad.title": "Uso fuoristrada",
    "quality.warranty.terms.offroad.p1":
      "Se la tua moto è configurata per l’uso fuoristrada o dual-sport, è coperta — purché tu rispetti i limiti del Manuale del Proprietario.",
    "quality.warranty.terms.responsibilities.title": "Le tue responsabilità",
    "quality.warranty.terms.responsibilities.list.1": "Segui il programma di manutenzione e conserva ricevute o registri",
    "quality.warranty.terms.responsibilities.list.2": "Usa caricatori e profili di ricarica approvati da GR1T",
    "quality.warranty.terms.responsibilities.list.3": "Installa gli aggiornamenti software quando forniti",
    "quality.warranty.terms.responsibilities.list.4": "Segnala tempestivamente eventuali problemi",
    "quality.warranty.terms.data.title": "Dati e diagnostica",
    "quality.warranty.terms.data.p1":
      "Per mantenere la tua moto sicura e affidabile, GR1T raccoglie alcuni dati diagnostici (come comportamento di ricarica e registri di prestazione). Questo ci aiuta a confermare le richieste di garanzia, migliorare la sicurezza e sviluppare modelli futuri.",
    "quality.warranty.terms.data.p2": "I dati sono trattati secondo il GDPR e archiviati nell’UE.",
    "quality.warranty.terms.transferable.title": "Trasferibile",
    "quality.warranty.terms.transferable.p1":
      "Se vendi la tua motocicletta nell’UE/SEE, la garanzia residua passa al nuovo proprietario gratuitamente.",
    "quality.warranty.terms.law.title": "Sempre tutelato dalla legge",
    "quality.warranty.terms.law.p1":
      "Questa garanzia si aggiunge alla garanzia legale di conformità di 2 anni prevista dal diritto dell’UE. I tuoi diritti di consumatore sono sempre preservati.",

    // Warranty EU detailed (IT)
    "quality.warrantyEU.title": "Garanzia Limitata per Clienti UE/SEE di GRIT Motorcycles GmbH",
    "quality.warrantyEU.s1.title": "1. Definizioni",
    "quality.warrantyEU.s1.list.1":
      "Garanzia legale (Gewährleistung): Garanzia statutaria di conformità di 2 anni ai sensi della Direttiva (UE) 2019/771 e della legge nazionale (es. §§ 434 ss. BGB).",
    "quality.warrantyEU.s1.list.2":
      "Garanzia commerciale (Garantie): Copertura volontaria descritta in questo documento, in aggiunta ai diritti di legge.",
    "quality.warrantyEU.s1.list.3":
      "SOH (State of Health): Capacità utilizzabile della batteria rispetto alla capacità nominale originale, misurata dal protocollo diagnostico GR1T a 25 °C.",
    "quality.warrantyEU.s2.title": "2. Diritti di legge",
    "quality.warrantyEU.s2.p1":
      "I tuoi diritti legali previsti dalla garanzia di conformità per consumatori dell’UE rimangono invariati. Essi si applicano per 3 anni dalla consegna, azionabili contro il venditore.",
    "quality.warrantyEU.s3.title": "3. Garanzia commerciale GR1T",
    "quality.warrantyEU.s3.list.1": "Motocicletta (tutti i componenti salvo esclusioni): 36 mesi, 36.000 km.",
    "quality.warrantyEU.s3.list.2":
      "Powertrain (motore, controller, cambio, caricatore di bordo, BMS): 36 mesi o 36.000 km (a seconda di quale avvenga per primo).",
    "quality.warrantyEU.s3.list.3":
      "Batteria di trazione: 6 anni per mantenere almeno l’80% di SOH. Se l’SOH scende sotto la soglia in uso conforme, GR1T riparerà o sostituirà la batteria o i moduli.",
    "quality.warrantyEU.s4.title": "4. Copertura include",
    "quality.warrantyEU.s4.list.1": "Telaio e chassis (solo difetti di fabbricazione)",
    "quality.warrantyEU.s4.list.2": "Sistema elettrico e cablaggi (solo difetti di fabbricazione)",
    "quality.warrantyEU.s4.list.3": "Sistema di gestione termica (solo difetti di fabbricazione)",
    "quality.warrantyEU.s4.list.4": "Apparecchiatura di ricarica a bordo fornita (solo difetti di fabbricazione)",
    "quality.warrantyEU.s5.title": "5. Esclusioni",
    "quality.warrantyEU.s5.list.1":
      "Componenti soggetti a usura: pneumatici, pastiglie/dischi freno, cuscinetti, catene/cinghie, corone, lampadine, manopole, selle, finiture estetiche.",
    "quality.warrantyEU.s5.list.2":
      "Ambiente/uso: incidenti, uso in gara/competizione, acrobazie, uso improprio, sovraccarico, conservazione impropria, corrosione, danni da infestanti.",
    "quality.warrantyEU.s5.list.3":
      "Manutenzione impropria o modifiche: manutenzione saltata, software o parti non approvati, manomissione di componenti HV sigillati.",
    "quality.warrantyEU.s5.list.4":
      "Abuso di ricarica: ricarica al di fuori delle specifiche GR1T; conservazione con scarica profonda deliberata; esposizione sopra 55 °C; immersione in acqua o altri liquidi.",
    "quality.warrantyEU.s6.title": "6. Specifiche batteria",
    "quality.warrantyEU.s6.list.1": "Degradazione normale: SOH pari o superiore al 80% dopo 1,500 cicli di ricarica.",
    "quality.warrantyEU.s6.list.2":
      "Ricarica conforme: La batteria GR1T è progettata per la ricarica a bassa tensione fino al pieno in ~3 ore. Usa solo caricatori approvati e segui le indicazioni del Manuale del Proprietario.",
    "quality.warrantyEU.s7.title": "7. Uso fuoristrada",
    "quality.warrantyEU.s7.p1":
      "Se la motocicletta è configurata e commercializzata per uso fuoristrada/dual-sport, tale uso è coperto purché conforme al Manuale del Proprietario. L’uso in gara/competizione rimane escluso.",
    "quality.warrantyEU.s8.title": "8. Obblighi del proprietario",
    "quality.warrantyEU.s8.list.1": "Segui il programma di manutenzione e conserva i registri.",
    "quality.warrantyEU.s8.list.2": "Usa caricatori approvati e profili di ricarica.",
    "quality.warrantyEU.s8.list.3": "Applica aggiornamenti software/firmware GR1T.",
    "quality.warrantyEU.s8.list.4": "Notifica GR1T o il rivenditore di guasti entro 30 giorni dalla scoperta.",
    "quality.warrantyEU.s9.title": "9. Procedura di richiesta",
    "quality.warrantyEU.s9.list.1": "Contatta GR1T o un rivenditore autorizzato con VIN, chilometraggio e descrizione.",
    "quality.warrantyEU.s9.list.2": "Possono essere richiesti dati di telemetria per verificare la conformità.",
    "quality.warrantyEU.s9.list.3": "Le riparazioni coperte vengono eseguite gratuitamente (parti e manodopera).",
    "quality.warrantyEU.s9.list.4": "Trasporto/recupero in officina non incluso.",
    "quality.warrantyEU.s10.title": "10. Consenso GDPR (telemetria/dati)",
    "quality.warrantyEU.s10.p1":
      "Attivando la motocicletta e collegandoti ai servizi GR1T, acconsenti alla raccolta, elaborazione e conservazione da parte di GR1T di dati diagnostici e di utilizzo (inclusi comportamento di ricarica, registri di guasti e metriche di prestazione) per: verifica della garanzia; monitoraggio della sicurezza; miglioramento del prodotto.",
    "quality.warrantyEU.s10.p2":
      "I dati sono trattati secondo il GDPR, conservati nell’UE e condivisi solo con partner autorizzati GR1T quando necessario. I termini dettagliati sulla privacy sono disponibili nella Privacy Policy di GR1T. Il consenso può essere revocato, ma ciò può influire sull’idoneità alla garanzia laddove i dati siano necessari per valutare la conformità.",
    "quality.warrantyEU.s11.title": "11. Trasferibilità",
    "quality.warrantyEU.s11.p1":
      "Questa Garanzia Limitata è trasferibile ai successivi proprietari all’interno dell’UE/SEE per il periodo residuo, senza costi.",
    "quality.warrantyEU.s12.title": "12. Legge applicabile",
    "quality.warrantyEU.s12.p1":
      "Questa garanzia è regolata dalla legge tedesca. I tribunali di Berlino hanno giurisdizione non esclusiva, senza pregiudicare i diritti del consumatore nel tuo paese di residenza.",

    // Sustainability page (IT)
    "sustainability.hero.title": "Sostenibilità",
    "sustainability.hero.p1":
      "In GR1T, la sostenibilità è integrata in ogni fase - dal design e approvvigionamento fino al fine vita. Seguiamo rigorosi standard UE per garantire riciclo, trasparenza, circolarità e riparabilità—costruendo motociclette che rispettano i piloti e il pianeta.",
    "sustainability.intro.p1":
      "Tutte le motociclette GR1T sono progettate con la sostenibilità e la produzione circolare in mente. Ciò riguarda le operazioni del nostro impianto e la progettazione e l'approvvigionamento dei prodotti, oltre a tutte le altre attività.",
    "sustainability.intro.p2": "In particolare:",
    "sustainability.list.iso14001.title": "ISO 14001 Sistemi di Gestione Ambientale",
    "sustainability.list.iso14001.p1":
      "Stiamo lavorando per ottenere la certificazione ISO 14001, dedicata ai sistemi di gestione ambientale. Ciò garantisce che tutte le attività che potrebbero avere un effetto nocivo sull'ambiente siano affrontate con piani tecnologici e gestionali adeguati. Una volta certificati, pubblicheremo un report annuale sui progressi del nostro EMS e, come clienti, sarete invitati a commentare.",
    "sustainability.list.batterySustainability.title": "Sostenibilità delle Batterie",
    "sustainability.list.batterySustainability.p1":
      "Le nostre batterie sono riciclate e, in molti casi, rigenerate in fabbrica per il riutilizzo. Se non vengono riutilizzate, sono riciclate in base al Regolamento UE 2023/1542, entrato in vigore il 17 agosto 2023. Questo regolamento definisce un approccio all'intero ciclo di vita della batteria: dall'approvvigionamento delle materie prime alla progettazione e produzione, fino all'uso, riuso e raccolta, e infine al riciclo e allo smaltimento. Per questo motivo ti invitiamo a segnalare qualsiasi difetto o problema della batteria e ad acquistare solo batterie approvate da GR1T.",
    "sustainability.list.digitalBatteryPassport.title": "Passaporto Digitale della Batteria",
    "sustainability.list.digitalBatteryPassport.p1":
      "Dall'inizio del nostro processo produttivo, introduciamo il Passaporto Digitale della Batteria richiesto dal Regolamento UE 2023/1542. Esso includerà l'identificazione del modello e del produttore della batteria; informazioni sull'impronta di carbonio, composizione e contenuto riciclato; e dati sulla capacità e sullo stato di salute. Saranno inoltre fornite istruzioni per lo smontaggio, il riciclo e la gestione in sicurezza.",
    "sustainability.list.digitalDashboard.title": "Cruscotto Digitale; Caricatori e Cablaggi",
    "sustainability.list.digitalDashboard.p1":
      "Il cruscotto digitale, così come tutti i caricatori e i sistemi di cablaggio elettrico della linea di motociclette GR1T, sono recuperabili e riciclabili. Puoi riciclarli tramite uno schema nazionale nel tuo paese di residenza oppure restituirli ai distributori GR1T e alla nostra rete di vendita per il riciclo. Il riciclo e il riutilizzo avvengono nel nostro stabilimento e sono in linea con la Direttiva RAEE (2012/19/UE).",
    "sustainability.list.digitalProductPassport.title": "Passaporto Digitale del Prodotto",
    "sustainability.list.digitalProductPassport.p1":
      "Le piattaforme GR1T G1S e G1X sono pronte ad adottare il Passaporto Digitale del Prodotto quando diventerà obbligatorio per legge.",
    "sustainability.list.rightToRepair.title": "Direttiva sul Diritto alla Riparazione",
    "sustainability.list.rightToRepair.p1":
      "In linea con il nostro impegno per la personalizzazione e l'aggiornamento di tutte le motociclette GR1T, rispettiamo la Direttiva sul Diritto alla Riparazione. Ciò significa che puoi riordinare ogni singolo pezzo di ricambio e componente necessario per riparare la tua motocicletta GR1T dal nostro sito web o trovarli (soggetti a disponibilità) nei nostri negozi o presso i distributori.",
    "sustainability.list.elv.title": "Veicoli a Fine Vita (ELV)",
    "sustainability.list.elv.p1":
      "Per sottolineare il nostro totale impegno per il riciclo e la circolarità, puoi contattarci per organizzare il riacquisto della tua motocicletta GR1T. Perché? Perché dal nostro lato possiamo riutilizzare una certa quantità di componenti e materiali. E perché, come produttore europeo, rispettiamo tutte le normative in questo ambito: rispettare l'ambiente fa parte del nostro DNA.",
    "sustainability.list.chemicals.title": "Sostanze Chimiche e Materiali",
    "sustainability.list.chemicals.p1":
      "Tutti i prodotti chimici e gli articoli contenenti sostanze chimiche, plastica, gomma e altri materiali, incluse vernici e rivestimenti, sono conformi al Regolamento REACH (CE) n. 1907/2006 e alla Direttiva RoHS2 sulla restrizione delle sostanze pericolose. Rispettiamo anche il Regolamento sui POP (Inquinanti Organici Persistenti). I nostri fornitori sono tenuti a fornirci tutte le certificazioni di conformità a queste leggi.",
    "sustainability.list.packaging.title": "Imballaggi",
    "sustainability.list.packaging.p1":
      "Garantiamo che tutti i componenti utilizzati nella nostra linea di imballaggio e supply chain, dal cartone ondulato alle coperture in plastica, siano recuperabili e riciclabili.",
    "sustainability.list.csddd.title": "Direttiva sulla Diligenza Sostenibile d'Impresa (CSDDD) (2024/1760)",
    "sustainability.list.csddd.p1":
      "Rispettiamo la Direttiva CSDDD, che costituisce anche una parte fondamentale dei nostri processi di certificazione ISO 14001 e ISO 9001.",
    "sustainability.list.energyEfficiency.title": "Efficienza Energetica della Fabbrica",
    "sustainability.list.energyEfficiency.p1":
      "Il nostro stabilimento è in fase di ampliamento e ristrutturazione. Parte di questo processo prevede la conformità agli standard di efficienza energetica. Implementeremo i Sistemi di Gestione dell'Energia ISO 50001 e i requisiti della Direttiva sull'Efficienza Energetica (2023/1791) come parte del nostro piano di espansione tra il 2027 e il 2030.",
    "sustainability.list.ghg.title": "Emissioni di Gas Serra",
    "sustainability.list.ghg.p1":
      "Stiamo sviluppando un sistema di misurazione dei GHG e forniremo report dettagliati a partire dalla metà del 2027.",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with browser language or default to English
  const [language, setLanguage] = useState<Language>("en");

  // Load saved language preference from cookie or localStorage on client side
  useEffect(() => {
    try {
      const match = typeof document !== "undefined" ? document.cookie.match(/(?:^|;\s*)locale=(en|it)/) : null;
      const cookieLang = (match && (match[1] as Language)) || undefined;
      if (cookieLang && (cookieLang === "en" || cookieLang === "it")) {
        setLanguage(cookieLang);
        return;
      }
    } catch {}
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "it")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    // Type assertion to handle dynamic keys
    return translations[language][key as TranslationKey] || key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
