Consent Manager Installation Instructions

1. Extract the contents of this zip file
2. Place the files in your website directory
3. Add the following code to your HTML page, inside the <head> tag:

<link rel="stylesheet" id="silktide-consent-manager-css" href="path-to-css/silktide-consent-manager.css">
<script src="path-to-js/silktide-consent-manager.js"></script>
<script>
silktideCookieBannerManager.updateCookieBannerConfig({
  background: {
    showBackground: true
  },
  cookieIcon: {
    position: "bottomLeft"
  },
  cookieTypes: [
    {
      id: "necessary",
      name: "Necessary",
      description: "<p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">These cookies are essential for the operation and security of our website. They enable core functions such as secure checkout, payment processing via Stripe, fraud prevention, session management, and saving your cookie preferences.</p><p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">Without these cookies, the website and reservation process cannot function properly.</p>",
      required: true,
      onAccept: function() {
        console.log('Add logic for the required Necessary here');
      }
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "<p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">These cookies help us understand how visitors interact with our website. We use Google Analytics (GA4) to collect anonymised data such as page views, session duration, device type, and navigation patterns.</p><p class=\"p2\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\"><span style=\"font-size: 1rem;\">This information allows us to improve website performance, usability, and content relevance.</span><br></p><p class=\"p2\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\"><span style=\"font-size: 1rem;\">Analytics cookies are only activated if you give your consent.</span><br></p>",
      required: false,
      onAccept: function() {
        gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
        dataLayer.push({
          'event': 'consent_accepted_analytics',
        });
      },
      onReject: function() {
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    },
    {
      id: "marketing",
      name: "Marketing",
      description: "<p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">These cookies are used to measure the effectiveness of our marketing campaigns and to deliver relevant advertisements on platforms such as Facebook and Instagram.</p><p class=\"p2\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\"><span style=\"font-size: 1rem;\">They may track your browsing behaviour across websites and enable conversion tracking, retargeting, and audience measurement through tools such as Meta Pixel.</span><br></p><p class=\"p2\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\"><span style=\"font-size: 1rem;\">Marketing cookies are only activated if you give your consent.</span><br></p>",
      required: false,
      onAccept: function() {
        console.log('Add accept logic for Marketing');
      },
      onReject: function() {
        console.log('Add reject logic for Marketing');
      }
    },
    {
      id: "functional_cookies",
      name: "Functional Cookies",
      description: "<p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">These cookies enable enhanced website features and third-party integrations, such as embedded YouTube videos.</p><p class=\"p2\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\"><span style=\"font-size: 1rem;\">If you disable these cookies, certain features may not function properly or may require additional consent before loading.</span><br></p><p class=\"p2\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\"><span style=\"font-size: 1rem;\">Functional cookies are only activated if you give your consent.</span><br></p>",
      required: false,
      onAccept: function() {
        console.log('Add accept logic for Functional Cookies');
      },
      onReject: function() {
        console.log('Add reject logic for Functional Cookies');
      }
    }
  ],
  text: {
    banner: {
      description: "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. <a href=\"https://your-website.com/cookie-policy\" target=\"_blank\">Cookie Policy.</a></p>",
      acceptAllButtonText: "Accept all",
      acceptAllButtonAccessibleLabel: "Accept all cookies",
      rejectNonEssentialButtonText: "Reject non-essential",
      rejectNonEssentialButtonAccessibleLabel: "Reject non-essential",
      preferencesButtonText: "Preferences",
      preferencesButtonAccessibleLabel: "Toggle preferences"
    },
    preferences: {
      title: "Customize your cookie preferences",
      description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",

    }
  },
  position: {
    banner: "bottomLeft"
  }
});
</script>
