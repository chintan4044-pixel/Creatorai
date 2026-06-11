import { YouTubePublishingPackage, VideoType, NicheType } from "../types";

const languageMap: Record<string, string> = {
  "hi": "Hindi (हिन्दी)",
  "en-IN": "English (Hinglish/Indian Accent Style)",
  "mr": "Marathi (मराठी)",
  "gu": "Gujarati (गुजराती)",
  "ben": "Bengali (বাংলা)",
  "ta": "Tamil (தமிழ்)",
  "te": "Telugu (తెలుగు)",
  "kn": "Kannada (ಕನ್ನಡ)",
  "ml": "Malayalam (മലയാളം)",
  "pa": "Punjabi (ਪੰਜਾਬੀ)",
  "ur": "Urdu (اردو)",
  "or": "Odia (ଓଡ଼ିଆ)",
  "as": "Assamese (অসমীয়া)"
};

interface LangResource {
  titles: string[];
  hooks: string[];
  style: string;
  angle: string;
  hookNarrator: string;
  problemNarrator: string;
  solutionNarrator: string;
  outroNarrator: string;
  textOverlay: string;
  voiceStyle: string;
  seoTitle: string;
  descriptionSnippet: string;
}

const localizedResources: Record<string, LangResource> = {
  "hi": {
    titles: [
      "क्या आपको TOPIC के बारे में यह चौंकाने वाला सच पता है?",
      "99% लोग TOPIC में क्यों फेल हो जाते हैं?",
      "मैंने 30 दिनों तक TOPIC ट्राई किया! इसके परिणाम हैरान करने वाले हैं...",
      "TOPIC का वो काला सच जो कोई क्रिएटर आपसे नहीं बताना चाहता!",
      "सिर्फ 1% लोग ही जानते हैं TOPIC का यह सीक्रेट ट्रिक!"
    ],
    hooks: [
      "99% लोग TOPIC में इस एक बड़े झूठ की वजह से असफल होते हैं...",
      "अगर आप अभी भी TOPIC पारंपरिक तरीके से कर रहे हैं, तो तुरंत रुक जाइए...",
      "इस आसान TOPIC स्ट्रैटेजी ने मेरी जिंदगी पूरी तरह बदल दी...",
      "TOPIC का वो भयानक सच जिसे जानकर आप चौंक जाएंगे..."
    ],
    style: "सीधा, ऊर्जावान और गहरा संवादात्मक टोन।",
    angle: "एक आम क्रिएटर कैसे TOPIC के गुप्त रहस्यों को उजागर करके सफल बनता है।",
    hookNarrator: "क्रिएटर्स आपसे TOPIC के बारे में लगातार झूठ बोल रहे हैं। सभी लोग इसे बहुत मुश्किल बताते हैं, लेकिन आज हम इस झूठ का पर्दाफाश करके आसान तरीका स्टेप-बाय-स्टेप बताएंगे।",
    problemNarrator: "असलियत यह है कि हमें यह सोचने पर मजबूर किया जाता है कि यह केवल कुछ खास विशेषज्ञों के लिए है। पर सटीक रिसर्च के बिना आप बस अपना कीमती समय बर्बाद कर रहे हैं।",
    solutionNarrator: "लेकिन घबराइए मत। कल सुबह से इन तीन छोटे बदलावों को अपने काम में लागू करें, और आप तुरंत ही दूसरे 90% कॉम्पिटिशन को पीछे छोड़ देंगे।",
    outroNarrator: "अगर इस वीडियो से आपको कुछ भी नया सीखने को मिला हो, तो अभी सब्सक्राइब करें। हम हर हफ्ते ऐसे ही सीक्रेट्स शेयर करते हैं। कमेंट में अपना विचार ज़रूर लिखें!",
    textOverlay: "बचकर रहें!",
    voiceStyle: "Premium Hindi Voice Accent",
    seoTitle: "TOPIC के अद्भुत सीक्रेट्स जो आपको जानना ज़रूरी है",
    descriptionSnippet: "इस वीडियो में हमने TOPIC से जुड़ी सभी बड़ी ग़लतियों और उनके सटीक समाधानों के बारे में विस्तार से चर्चा की है।"
  },
  "en-IN": {
    titles: [
      "The Shocking Truth about TOPIC which nobody tells you!",
      "Why 99% of people fail in TOPIC instantly!",
      "I tried TOPIC for 30 days and the results are crazy...",
      "The $10,000 TOPIC Secret hidden in plain sight",
      "Only 1% of creators know this secret TOPIC hack!"
    ],
    hooks: [
      "Aksar log TOPIC mein ek bohot bade jhooth ki wajah se fail hote hain...",
      "Agar aap abhi bhi TOPIC purane tarike se kar rahe ho, toh abhi stop karo...",
      "Is simple TOPIC strategy ne meri poori game badal di...",
      "Most people think TOPIC is hard, but actually it is easy..."
    ],
    style: "Informal, Hinglish-conversational, engaging and highly punchy tone.",
    angle: "Busting absolute false advice regarding TOPIC with actionable high-fidelity points.",
    hookNarrator: "Dosto, aapko TOPIC ke baare mein ab tak behkaaya gaya hai. Sab bolte hain ki yeh bohot mushkil hai, par aaj hum iska ekdam simple blueprint dekhenge.",
    problemNarrator: "Asal dikkat pata hai kya hai? Hume lagta hai ki yeh sirf bade creators ya experts ke bas ki baat hai, bina sahi methodology ke hamara retention girta rehta hai.",
    solutionNarrator: "But don't worry, kal subah se sirf yeh teen changes apply karo, and you will instantly stand out from 90% of your competition on YouTube.",
    outroNarrator: "Agar is video se aapko sach mein value mili, toh subscribe button dabana mat bhoolna. Har week aisi premium tricks aati rahengi! Comment zaroor karna!",
    textOverlay: "WARNING!",
    voiceStyle: "Premium Hinglish Sound Voice",
    seoTitle: "Unveiling TOPIC Secrets — The Ultimate Blueprint",
    descriptionSnippet: "Find out how we managed to solve the biggest challenges in TOPIC in this special publishing package."
  },
  "mr": {
    titles: [
      "TOPIC बद्दलचा हा धक्कादायक खुलासा तुम्हाला माहित आहे का?",
      "99% लोक TOPIC मध्ये का अपयशी ठरतात?",
      "मी 30 दिवस TOPIC चा वापर केला, निकालाने माझे डोळे उघडले...",
      "TOPIC चे ते काळे सत्य जे मोठे क्रिएटर्स लपवून ठेवतात!",
      "फक्त 1% लोकांना माहित आहे TOPIC ची ही गुप्त ट्रिक!"
    ],
    hooks: [
      "99% लोक TOPIC मध्ये या एका मोठ्या चुकीमुळे अपयशी ठरतात...",
      "जर तुम्ही अजूनही जुन्या पद्धतीने TOPIC करत असाल तर त्वरित थांबवा...",
      "या सोप्या TOPIC स्ट्रॅटेजीने माझ्या चॅनेलला प्रचंड ग्रोथ दिली..."
    ],
    style: "थेट, प्रभावी आणि रंजक संभाषण शैली.",
    angle: "TOPIC मधील समस्यांवर मात करून वेगाने कसे यशस्वी व्हावे यावर सुस्पष्ट भाष्य.",
    hookNarrator: "तुम्हाला TOPIC बद्दल आजपर्यंत अनेक गोष्टी चुकीच्या सांगण्यात आल्या आहेत. बहुतेक तज्ज्ञ हे खूप कठीण आहे असे भासवतात, पण आज आपण त्याचे खरे सत्य सोप्या भाषेत समजून घेऊया.",
    problemNarrator: "सगळ्यात मोठी समस्या म्हणजे आपल्याला वाटतं की यासाठी मोठ्या इन्व्हेस्टमेंटची गरज आहे, पण खरं सांगायचं तर योग्य कल्पनेअभावी आपण फक्त आपला वेळ वाया घालवतो.",
    solutionNarrator: "पण काळजी करू नका, उद्यापासून केवळ या तीन साध्या गोष्टी अमलात आणा, आणि तुम्ही इतर स्पर्धांच्या खूप पुढे निघून जाल.",
    outroNarrator: "जर हा व्हिडिओ तुम्हाला उपयुक्त वाटला असेल तर आत्ताच सबस्क्राईब करा. कमेंट करून तुमचे मत नक्की कळवा!",
    textOverlay: "धक्कादायक!",
    voiceStyle: "Premium Marathi Accent Voice",
    seoTitle: "TOPIC बद्दलच्या गुप्त गोष्टी ज्या प्रत्येक मराठी क्रिएटरला माहित असायला हव्यात",
    descriptionSnippet: "या व्हिडिओमध्ये आपण TOPIC च्या काही लपलेल्या गोष्टींविषयी सखोल माहिती घेणार आहोत."
  },
  "gu": {
    titles: [
      "શું તમે TOPIC વિશે આ ચોંકાવનારી વાત જાણો છો?",
      "99% લોકો TOPIC મા કેમ નિષ્ફળ જાય છે?",
      "મેં 30 દિવસ સુધી TOPIC ટ્રાય કર્યું, અને પછી જે થયું...",
      "TOPIC નું એ કાળું રહસ્ય જે કોઈ યુટ્યુબર નથી કહેતું!"
    ],
    hooks: [
      "99% લોકો TOPIC મા આ એક મોટી ભૂલ ના કારણે જ અટવાઈ જાય છે...",
      "જો તમે હજુ પણ જૂની પદ્ધતિ થી TOPIC કરી રહ્યા છો, તો અત્યારે જ બંધ કરો..."
    ],
    style: "સરળ, આપણી ગુજરાતી શૈલીમાં અને આકર્ષક અવાજ.",
    angle: "યુઝરને ઉપયોગી એવી સાચી અને પ્રેક્ટિકલ વાતો ની સમજૂતી.",
    hookNarrator: "તમારી સાથે TOPIC વિશે સતત જૂઠું બોલવામાં આવ્યું છે. બધા કહે છે કે આ બહુ અઘરું છે, પણ આજે આપણે આ વીડિયોમાં બધી જ પોલ ખોલી નાખીશું.",
    problemNarrator: "સાચી મુશ્કેલી એ છે કે આપણે કોઈ પ્લેન વગર ચાલુ કરી દઈએ છીએ અને પછી પરિણામ નથી મળતું, જેનાથી આપણો આત્મવિશ્વાસ તૂટી જાય છે.",
    solutionNarrator: "પરંતુ ચિંતા ના કરો, કાલથી માત્ર આ ત્રણ નિયમો તમારા કામમાં લાવો અને તમે બીજા 90% લોકો કરતા આગળ નીકળી જશો.",
    outroNarrator: "જો આ માહિતી ગમી હોય તો ચેનલને સબ્સ્ક્રાઇબ કરો અને નીચે કમેન્ટમાં તમારો અભિપ્રાય જણાવો!",
    textOverlay: "સાવધાન!",
    voiceStyle: "Premium Gujarati Accent Voice",
    seoTitle: "TOPIC વિષય પર સંપૂર્ણ વિડીયો માર્ગદર્શન",
    descriptionSnippet: "આ વિડીયોમાં અમે TOPIC કેવી રીતે સહેલાઈથી માસ્ટર કરવું તેના વિશે ઊંડાણપૂર્વક ચર્ચા કરી છે."
  },
  "ben": {
    titles: [
      "TOPIC সম্পর্কে এই চমকপ্রদ সত্যটি কি আপনি জানেন?",
      "কেন 99% মানুষ TOPIC শেখার সময় ব্যর্থ হয়?",
      "আমি ৩০ দিন ধরে TOPIC ট্রাই করলাম, ফলাফল দেখুন...",
      "TOPIC নিয়ে বড় বড় ক্রিয়েটরদের গোপন রাখা আসল রহস্য!"
    ],
    hooks: [
      "99% মানুষ TOPIC নিয়ে কাজ করার সময় এই একটি ভুল করে...",
      "আপনি যদি এখনও প্রাচীন পদ্ধতিতে TOPIC করছেন, তবে এখনই থামুন..."
    ],
    style: "প্রাণবন্ত, সহজ এবং আকর্ষণীয় ভঙ্গিতে উপস্থাপনা।",
    angle: "TOPIC এর জটিল বিষয়গুলিকে সহজে ভেঙে সবার সামনে তুলে ধরা।",
    hookNarrator: "TOPIC নিয়ে আপনাদের এতদিন ধরে ভুল বোঝানো হয়েছে। বেশিরভাগ মানুষ ভাবেন এটি খুব কঠিন, কিন্তু আজ আমরা একদম সহজ উপায়ে এটি শিখে নেব।",
    problemNarrator: "আসল সমস্যাটি হলো আমরা শুরুতেই সঠিক পরিকল্পনা করি না, যার ফলে কোনো ভালো ফলাফল পাই না এবং হাল ছেড়ে দিই।",
    solutionNarrator: "তবে ভয়ের কিছু নেই, আগামীকাল থেকে এই তিনটি সহজ পরিবর্তন আপনার কাজে প্রয়োগ করুন এবং অন্যদের থেকে দ্রুত এগিয়ে যান।",
    outroNarrator: "ভিডিওটি ভালো লাগলে অবশ্যই সাবস্ক্রাইব করুন এবং কমেন্ট করে আমাদের সাথে শেয়ার করুন আপনার মতামত!",
    textOverlay: "দারুণ ট্রিক!",
    voiceStyle: "Premium Bengali Accent Voice",
    seoTitle: "TOPIC নিয়ে অজানা চমকপ্রদ কিছু সত্য রহস্য উন্মোচন",
    descriptionSnippet: "আজকের স্পেশাল ভিডিওতে আমরা TOPIC নিয়ে খোলামেলা আলোচনা করেছি।"
  },
  "ta": {
    titles: [
      "TOPIC பற்றிய இந்த அதிர்ச்சியூட்டும் உண்மை உங்களுக்கு தெரியுமா?",
      "ஏன் 99% மக்கள் TOPIC-ல் உடனடியாக தோல்வியடைகிறார்கள்?",
      "நான் 30 நாட்கள் TOPIC முயன்று பார்த்தேன், இதோ முடிவு...",
      "TOPIC-ன் அந்த இருண்ட இரகசியம், யாரும் சொல்ல மறுப்பது!"
    ],
    hooks: [
      "99% மக்கள் TOPIC-ல் இந்த ஒரு பொய் காரணமாகத்தான் தோற்றுப்போகிறார்கள்...",
      "நீங்கள் இன்னும் பழைய வழியில் TOPIC செய்துகொண்டிருந்தால், உடனே நிறுத்துங்கள்..."
    ],
    style: "தெளிவான, நேர்த்தியான மற்றும் சுவாரஸ்யமான தமிழ் பேச்சு வழக்கு.",
    angle: "வழக்கமான மூடநம்பிக்கைகளை உடைத்து உண்மைகளை ஆதாரத்துடன் விளக்குதல்.",
    hookNarrator: "TOPIC பற்றி உங்களிடம் தொடர்ந்து பொய்கள் கூறப்பட்டு வருகின்றன. இது மிகவும் கடினம் என பலர் உங்களுக்கு பயமுறுத்துகிறார்கள், ஆனால் இன்று நாம் இதை எளிமையாக்கப் போகிறோம்.",
    problemNarrator: "உண்மையான பிரச்சனை என்னவென்றால், இதன் அடிப்படை நுணுக்கம் தெரியாமல் நாம் குருட்டுத்தனமாக உழைப்பதுதான்.",
    solutionNarrator: "ஆனால் கவலை வேண்டாம், நாளை முதல் இந்த மூன்று வழிகளை பின்பற்றுங்கள், நீங்கள் மற்றவர்களை விட பல மடங்கு வேகமாக வளர முடியும்.",
    outroNarrator: "இந்த தகவல் உங்களுக்கு பயனுள்ளதாக இருந்தால் உடனே சப்ஸ்கிரைப் செய்யவும், உங்கள் கருத்துக்களை கீழே பகிருங்கள்!",
    textOverlay: "உண்மை இதுவே!",
    voiceStyle: "Premium Tamil Accent Voice",
    seoTitle: "TOPIC ரகசியங்கள் மற்றும் தெளிவான விளக்கம்",
    descriptionSnippet: "இந்த வீடியோவில் நாம் விரிவாக TOPIC பயன்பாடு மற்றும் அதன் வளர்ச்சி ரகசியங்களை ஆராய்ந்துள்ளோம்."
  },
  "te": {
    titles: [
      "TOPIC గురించి ఈ షాకింగ్ నిజం మీకు తెలుసా?",
      "99% మంది TOPIC లో ఎందుకు విఫలమవుతారు?",
      "నేను 30 రోజులు TOPIC ట్రై చేశాను, ఫలితం మీరే చూడండి...",
      "TOPIC వెనుక ఉన్న రహస్యం, ఏ పెద్ద యూట్యూబర్ చెప్పనిది!"
    ],
    hooks: [
      "99% మంది TOPIC ప్రారంభించేటప్పుడు ఈ చిన్న పొరపాటు వల్లే నష్టపోతున్నారు...",
      "మీరు ఇంకా పాత కాలపు పద్ధతిలోనే TOPIC చేస్తుంటే, వెంటనే ఆపేయండి..."
    ],
    style: "సరళమైన, స్పష్టమైన మరియు ఉత్సాహపూరితమైన తెలుగు సంభాషణ.",
    angle: "విశ్లేషణ మరియు వాస్తవాల ఆధారంగా నమ్మకమైన పరిష్కారం చూపడం.",
    hookNarrator: "TOPIC గురించి మీతో చాలా విషయాలు దాచిపెట్టారు. ఇది చాలా క్లిష్టమైనది అని నమ్మిస్తారు, కానీ ఈరోజు నేను దీని వెనుక ఉన్న అసలు నిజాన్ని విడమర్చి చెప్తాను.",
    problemNarrator: "ప్రధాన సమస్య ఏమిటంటే, సరైన గైడెన్స్ లేకుండా మనం పదే పదే ప్రయత్నిస్తూ సమయం వృధా చేసుకోవడం.",
    solutionNarrator: "కానీ ఇప్పుడు బాధపడాల్సిన అవసరం లేదు, రేపటి నుండి ఈ మూడు మార్పులు చేయండి, మీ రిజల్ట్స్ చూసి మీరే ఆశ్చర్యపోతారు.",
    outroNarrator: "ఈ వీడియో మీకు నచ్చినట్లయితే వెంటనే సబ్‌స్క్రైబ్ చేసుకోండి, మీ అభిప్రాయాన్ని కామెంట్‌లో తెలియజేయండి!",
    textOverlay: "గమనించండి!",
    voiceStyle: "Premium Telugu Accent Voice",
    seoTitle: "TOPIC కి సంబంధించిన సరికొత్త అప్‌డేట్స్ మరియు సీక్రెట్స్",
    descriptionSnippet: "ఈ తెలుగు వీడియోలో మనం TOPIC యొక్క ముఖ్యమైన నియమాలను తెలుసుకోబోతున్నాం."
  },
  "kn": {
    titles: [
      "TOPIC ಬಗ್ಗೆ ಈ ಆಘಾತಕಾರಿ ಸತ್ಯ ನಿಮಗೆ ಗೊತ್ತೇ?",
      "99% ರಷ್ಟು ಜನರು TOPIC ನಲ್ಲಿ ಯಾಕೆ ವಿಫಲರಾಗುತ್ತಾರೆ?",
      "ನಾನು 30 ದಿನಗಳ ಕಾಲ TOPIC ಪ್ರಯತ್ನಿಸಿದೆ, ಆಶ್ಚರ್ಯಕರ ರಿಸಲ್ಟ್ಸ್...",
      "TOPIC ನ ಆ ಕರಾಳ ಸತ್ಯ, ಯಾವುದೇ ಕ್ರಿಯೇಟರ್ ಇದನ್ನು ಹೇಳುವುದಿಲ್ಲ!"
    ],
    hooks: [
      "99% ಜನರು TOPIC ವಿಷಯದಲ್ಲಿ ಈ ಒಂದು ತಪ್ಪಿನಿಂದಾಗಿ ನಷ್ಟ ಅನುಭವಿಸುತ್ತಿದ್ದಾರೆ...",
      "ನೀವಿನ್ನು ಹಳೆಯ ಸಾಂಪ್ರದಾಯಿಕ ಶೈಲಿಯಲ್ಲಿ TOPIC ಮಾಡುತ್ತಿದ್ದರೆ, ತಕ್ಷಣ ನಿಲ್ಲಿಸಿ..."
    ],
    style: "ಸ್ವಚ್ಛ ಮತ್ತು ಆಕರ್ಷಕ ಕನ್ನಡ ಮಾತುಗಾರಿಕೆ.",
    angle: "ವೀಕ್ಷಕರಿಗೆ ನಿಜವಾದ ಮೌಲ್ಯ ಮತ್ತು ಜ್ಞಾನ ಒದಗಿಸುವ ನಿರೂಪಣೆ.",
    hookNarrator: "TOPIC ಬಗ್ಗೆ ನಿಮಗೆ ಇದುವರೆಗೂ ತಪ್ಪು ಮಾಹಿತಿ ನೀಡಲಾಗಿದೆ. ಪ್ರತಿಯೊಬ್ಬರೂ ಇದನ್ನು ಅತ್ಯಂತ ಸಂಕೀರ್ಣ ಎಂದು ಬಿಂಬಿಸುತ್ತಾರೆ, ಆದರೆ ಇಂದು ನಾನು ಸತ್ಯವನ್ನು ತಿಳಿಸುತ್ತೇನೆ.",
    problemNarrator: "ರಹಸ್ಯ ವಿಷಯವೇನೆಂದರೆ, ನಾವೆಲ್ಲರೂ ಯೋಜನೆಯೇ ಇಲ್ಲದೆ ಕೆಲಸಕ್ಕೆ ಇಳಿಯುತ್ತೇವೆ, ನಂತರ ವೈಫಲ್ಯ ಹೊಂದುತ್ತೇವೆ.",
    solutionNarrator: "ಆದರೆ ಚಿಂತಿಸಬೇಡಿ, ನಾಳೆಯಿಂದ ಕೇವಲ ಈ ಮೂರು ಪ್ರಮುಖ ಬದಲಾವಣೆಗಳನ್ನು ರೂಢಿಸಿಕೊಳ್ಳಿ, ನೀವೇ ವಿಜೇತರಾಗುತ್ತೀರಿ.",
    outroNarrator: "ಈ ಮಾಹಿತಿ ಉಪಯುಕ್ತವೆನಿಸಿದರೆ ನಮ್ಮ ಚಾನೆಲ್‌ಗೆ ಈಗಲೇ ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಆಗಿ ಮತ್ತು ಕಮೆಂಟ್ ಮಾಡಿ ಪ್ರೋತ್ಸಾಹಿಸಿ!",
    textOverlay: "ತಪ್ಪದೆ ನೋಡಿ!",
    voiceStyle: "Premium Kannada Accent Voice",
    seoTitle: "TOPIC ಸುಲಭವಾಗಿ ಕಲಿಯಲು ಸಂಪೂರ್ಣ ಮಾಹಿತಿ",
    descriptionSnippet: "ಕನ್ನಡದಲ್ಲಿ TOPIC ಕುರಿತಾದ ಅತಿ ದೊಡ್ಡ ತಪ್ಪು ತಿಳುವಳಿಕೆಗಳನ್ನು ಇಲ್ಲಿ ನಿವಾರಿಸಲಾಗಿದೆ."
  },
  "ml": {
    titles: [
      "TOPIC നെക്കുറിച്ചുള്ള ഈ ഞെട്ടിപ്പിക്കുന്ന സത്യം നിങ്ങൾക്കറിയാമോ?",
      "99% ആളുകളും TOPIC-ൽ പരാജയപ്പെടാൻ കാരണം ഇതാണ്!",
      "ഞാൻ 30 ദിവസം TOPIC ചെയ്തു നോക്കി, ഫലം വിശ്വസിക്കാനായില്ല...",
      "TOPIC നെക്കുറിച്ച് ആരും പറയാൻ മടിക്കുന്ന യഥാർത്ഥ രഹസ്യങ്ങൾ!"
    ],
    hooks: [
      "99% ആളുകളും TOPIC-ൽ പരാജയപ്പെടുന്നത് ഈ ഒരു തെറ്റിദ്ധാരണ കൊണ്ടാണ്...",
      "നിങ്ങൾ ഇപ്പോഴും പഴയ രീതിയിലാണ് TOPIC ചെയ്യുന്നതെങ്കിൽ, ഉടൻ നിർത്തുക..."
    ],
    style: "സ്വാഭാവികവും ലളിതവുമായ മലയാളം ശൈലി.",
    angle: "ജനപ്രിയ ചോദ്യങ്ങൾക്ക് ബുദ്ധിപരമായ മറുപടിയും സഹായവും നൽകുക.",
    hookNarrator: "TOPIC നെക്കുറിച്ച് നിങ്ങളോട് എല്ലാവരും പലതും മറച്ചുവെച്ചിരിക്കുകയാണ്. ഇത് വളരെ പ്രയാസമാണെന്നാണ് അവർ വരുത്തിതീർക്കുന്നത്, എന്നാൽ ഇന്ന് ഇതിന്റെ അസൽ വഴി ഞാൻ തരാം.",
    problemNarrator: "യഥാർത്ഥ പ്രശ്നം നാമറിയാതെ നമ്മുടെ സമയം അനാവശ്യ കാര്യങ്ങളിലേക്ക് വഴിതിരിച്ചു വിടുന്നതാണ്.",
    solutionNarrator: "എന്നാൽ ഇനി വിഷമിക്കേണ്ട, നാളെ രാവിലെ മുതൽ ഈ മൂന്ന് കാര്യങ്ങൾ ഒന്നു മാറ്റി ചെയ്തു നോക്കൂ, വ്യത്യാസം കാണാം.",
    outroNarrator: "കൂടുതൽ വിവരങ്ങൾക്കായി ഈ ചാനൽ സബ്സ്ക്രൈബ് ചെയ്യുക, നിങ്ങളുടെ വിലയേറിയ അഭിപ്രായങ്ങൾ പങ്കുവെക്കുക!",
    textOverlay: "കൂടുതലറിയൂ!",
    voiceStyle: "Premium Malayalam Accent Voice",
    seoTitle: "TOPIC രഹസ്യങ്ങളും വിജയിക്കാനുള്ള യഥാർത്ഥ വഴികളും",
    descriptionSnippet: "മലയാളത്തിൽ TOPIC എങ്ങനെ എളുപ്പത്തിൽ മികച്ച രീതിയിൽ കൈകാര്യം ചെയ്യാമെന്ന് വിവരിക്കുന്നു."
  },
  "pa": {
    titles: [
      "ਕੀ ਤੁਹਾਨੂੰ TOPIC ਬਾਰੇ ਇਹ ਹੈਰਾਨ ਕਰਨ ਵਾਲਾ ਸੱਚ ਪਤਾ ਹੈ?",
      "99% ਲੋਕਾਂ ਦੇ TOPIC ਵਿੱਚ ਫੇਲ੍ਹ ਹੋਣ ਦਾ ਅਸਲ ਕਾਰਨ!",
      "ਮੈਂ 30 ਦਿਨਾਂ ਤੱਕ TOPIC ਦੀ ਵਰਤੋਂ ਕੀਤੀ, ਫਿਰ ਜੋ ਹੋਇਆ...",
      "TOPIC ਦਾ ਉਹ ਕਾਲਾ ਸੱਚ ਜੋ ਕੋਈ ਵੀ ਵੱਡਾ ਯੂਟਿਊਬਰ ਨਹੀਂ ਦੱਸਦਾ!"
    ],
    hooks: [
      "99% ਲੋਕ TOPIC ਦੀ ਸ਼ੁਰੂਆਤ ਕਰਦੇ ਸਮੇਂ ਇਸ ਇੱਕ ਗਲਤੀ ਦਾ ਸ਼ਿਕਾਰ ਹੁੰਦੇ ਹਨ...",
      "ਜੇਕਰ ਤੁਸੀਂ ਹਾਲੇ ਵੀ ਪੁਰਾਣੇ ਢੰਗ ਨਾਲ TOPIC ਕਰ ਰਹੇ ਹੋ, ਤਾਂ ਹੁਣੇ ਰੁਕ ਜਾਓ..."
    ],
    style: "ਸਿੱਧੀ, ਦਮਦਾਰ ਅਤੇ ਪਿਆਰੀ ਪੰਜਾਬੀ ਬੋਲਚਾਲ ਦੀ ਸ਼ੈਲੀ।",
    angle: "ਲੋਕਾਂ ਨੂੰ ਹੌਸਲਾ ਅਤੇ ਸਹੀ ਗਿਆਨ ਦੇਣ ਵਾਲਾ ਦ੍ਰਿਸ਼ਟੀਕੋਣ।",
    hookNarrator: "ਦੋਸਤੋ, ਤੁਹਾਨੂੰ TOPIC ਬਾਰੇ ਹਮੇਸ਼ਾ ਗਲਤ ਰਸਤੇ ਪਾਇਆ ਗਿਆ ਹੈ। ਸਭ ਕਹਿੰਦੇ ਹਨ ਕਿ ਇਹ ਬਹੁਤ ਔਖਾ ਹੈ, ਪਰ ਅੱਜ ਅਸੀਂ ਇਸਦਾ ਪੂਰਾ ਸੱਚ ਸੌਖੇ ਤਰੀਕੇ ਨਾਲ ਸਮਝਾਂਗੇ।",
    problemNarrator: "ਅਸਲ ਗੱਲ ਇਹ ਹੈ ਕਿ ਬਿਨਾਂ ਸਹੀ ਜਾਣਕਾਰੀ ਦੇ ਅਸੀਂ ਮਿਹਨત ਕਰਦੇ ਜਾਂਦੇ ਹਾਂ, ਜਿਸਦਾ ਕੋਈ ਫਾਇਦਾ ਨਹੀਂ ਮਿਲਦਾ।",
    solutionNarrator: "ਕੱਲ੍ਹ ਤੋਂ ਹੀ ਇਹ ਤਿੰਨ ਨੁਸਖੇ ਆਪਣੀ ਰੋਜ਼ਮੱਰਾ ਵਿੱਚ ਅਪਲਾਈ ਕਰੋ, ਤੁਸੀਂ ਬਾਕੀਆਂ ਨਾਲੋਂ ਬਹੁਤ ਅੱਗੇ ਲੰਘ ਜਾਓਗੇ।",
    outroNarrator: "ਜੇਕਰ ਇਹ ਗੱਲਾਂ ਵਧੀਆ ਲੱਗੀਆਂ ਤਾਂ ਚੈਨਲ ਨੂੰ ਸਬਸਕ੍ਰਾਈਬ ਜ਼ਰੂਰ ਕਰਨਾ ਤੇ ਕਮੈਂਟ ਵਿੱਚ ਆਪਣੀ ਰਾਏ ਦੇਣਾ!",
    textOverlay: "ਧਿਆਨ ਦਿਓ!",
    voiceStyle: "Premium Punjabi Accent Voice",
    seoTitle: "TOPIC ਬਾਰੇ ਕੁਝ ਗੁਪਤ ਅਤੇ ਫਾਇਦੇਮੰਦ ਜਾਣਕਾਰੀਆਂ",
    descriptionSnippet: "ਪੰਜਾਬੀ ਵਿੱਚ TOPIC ਦੇ ਸਾਰੇ ਪਹਿਲੂਆਂ ਅਤੇ ਤਰੀਕਿਆਂ ਬਾਰੇ ਖੋਲ੍ਹ ਕੇ ਚਰਚਾ ਕੀਤੀ ਗਈ ਹੈ।"
  },
  "ur": {
    titles: [
      "کیا آپ کو TOPIC کے بارے میں یہ حیران کن سچ معلوم ہے؟",
      "کیوں 99 فیصد لوگ TOPIC میں ناکام ہو جاتے ہیں؟",
      "میں نے 30 دن تک TOPIC آزمایا، اور نتائج تو دنگ کر دینے والے تھے!",
      "TOPIC کا وہ تاریک سچ جو کوئی یوٹیوبر نہیں بتاتا!"
    ],
    hooks: [
      "99 فیصد لوگ TOPIC کے میدان میں صرف اس ایک دھوکے کی وجہ سے مار کھاتے ہیں...",
      "اگر آپ ابھی تک پرانی تکنیک کے ساتھ TOPIC کر رہے ہیں تو رکیں..."
    ],
    style: "نہایت ہی شائستہ، پراعتماد اور پُرکشش گفتگو کا انداز۔",
    angle: "حقائق کو واضح کر کے ناظرین کو آسان ترین حل پیش کرنا।",
    hookNarrator: "ناظرین، آپ کو ہمیشہ TOPIC کے حوالے سے الجھایا گیا ہے۔ سب کہتے ہیں کہ یہ بہت مشکل ہے، لیکن آج ہم اس کے پیچھے چھپے ہوئے سچ کو سامنے لائیں گے۔",
    problemNarrator: "اصل مسئلہ یہ ہے کہ ہمیں ایک غلط راہ دکھائی جاتی ہے اور ہم بغیر سوچے سمجھے اس پر چلتے رہتے ہیں۔",
    solutionNarrator: "لیکن پریشان ہونے کی ضرورت بالکل نہیں، کل سے ان تین آسان طریقوں پر عمل کریں، آپ منٹوں میں دوسروں کو پیچھے چھوڑ دیں گے۔",
    outroNarrator: "ویڈیو پسند آئی ہو تو چینل کو لازمی سبسکرائب کریں اور نیچے کمنٹ میں اپنی رائے دینا نہ بھولیں!",
    textOverlay: "حیران کن!",
    voiceStyle: "Premium Urdu Accent Voice",
    seoTitle: "TOPIC کی مکمل گائیڈ اور اس کے پیچھے چھپے ہوئے اہم راز",
    descriptionSnippet: "اس تفصیلی ویڈیو میں ہم نے TOPIC کے بارے میں اٹھنے والے تمام سوالوں کے آسان جواب دیئے ہیں۔"
  },
  "or": {
    titles: [
      "TOPIC ବିଷୟରେ ଏହି ଚକିତ କଲାଭଳି ସତ୍ୟ ଆପଣ ଜାଣିଛନ୍ତି କି?",
      "କାହିଁକି 99% ଲୋକ TOPIC ରେ ବିଫଳ ହୁଅନ୍ତି?",
      "ମୁଁ 30 ଦିନ TOPIC ଚେଷ୍ଟା କଲି, ଆଶ୍ଚର୍ଯ୍ୟଜନକ ଫଳାଫଳ...",
      "TOPIC ର ସେହି ଗୁପ୍ତ ସତ୍ୟ ଯାହା ଆପଣଙ୍କୁ କେହି କହିବେ ନାହିଁ!"
    ],
    hooks: [
      "99% ଲୋକ TOPIC ରେ ଏହି ଗୋଟିଏ ଭୁଲ ପାଇଁ ବିଫଳ ହୋଇଥାନ୍ତି...",
      "ଯଦି ଆପଣ ଏବେ ମଧ୍ୟ ପୁରୁଣା ଢଙ୍ગରେ TOPIC କରୁଛନ୍ତି, ତେବે ତୁରନ୍ତ ବନ୍ଦ କରନ୍ତୁ..."
    ],
    style: "ସରଳ, ସ୍ପଷ୍ଟ ଏବଂ ହୃଦୟସ୍ପର୍ଶୀ ଓଡ଼ିଆ ଭାଷା।",
    angle: "ସାଧାରଣ ଲୋକଙ୍କ ପାଇଁ ସହଜ ଏବଂ ପ୍ରଭାବଶାଳୀ ଗାଇଡ୍ ଦେଖାଇବା।",
    hookNarrator: "TOPIC ବିଷୟରେ ଆପଣଙ୍କୁ ଆଜି ଯାଏଁ ସବୁ ଭୁଲ କୁହାଯାଇଛି। ସମସ୍ତେ ଏହାକୁ ଜଟିଳ ମନେ କରନ୍ତି, କିନ୍ତು ଆଜି ଆମେ ଏହାର ପେଡ଼ି ଖୋଲିବା।",
    problemNarrator: "ପ୍ରକୃତ ସମସ୍ୟା ହେଉଛି କୌଣସି ନିର୍ଦ्ଦିଷ୍ଟ ରଣନୀତି ନଥାଇ ଚେଷ୍ଟା କରି ସମୟ ନଷ୍ଟ କରିବା।",
    solutionNarrator: "କିନ୍ତୁ ବ୍ୟସ୍ତ ହୁଅନ୍ତυ ନାହିଁ, ଆସନ୍ତାକାଲି ଠାରୁ କେବଳ ଏହି ତିନୋଟି ପରିବର୍ତ୍ତନ କରନ୍ତು, ଆପଣ ଅନ୍ୟମାନଙ୍କ ତୁଳନାରେ ବହୁତ ଆଗକୁ ବଢ଼ିପାରିବେ।",
    outroNarrator: "ଯଦિ ଭିଡିଓଟି ଭଲ ଲାଗିଲା, ତେବେ ଏବେ ହିଁ ସବସ୍କ୍ରାଇବ କରନ୍ତು ଏବେ ଆପଣଙ୍କ ମତାମତ କମେଣ୍ଟ ରେ ଜଣାନ୍ତୁ!",
    textOverlay: "ସାବଧାନ!",
    voiceStyle: "Premium Odia Accent Voice",
    seoTitle: "TOPIC ବିଷୟରେ କିଛି ଅକୁହା ଏବଂ ଆବଶ୍ୟକୀୟ ତଥ୍ୟ",
    descriptionSnippet: "ଏହି ଓଡ଼ିଆ ଭီଡିଓ ମାଧ୍ୟମରେ ଆମେ TOPIC ପାଇଁ କିଛି ଗୁରୁତ୍ଵପୂର୍ଣ୍ଣ ଗାଇଡଲାଇନ ଆଲୋଚନା କରିଛୁ।"
  },
  "as": {
    titles: [
      "TOPIC ৰ বিষয়ে এই আচৰিত কৰা সত্যটো আপুনি জানে নেকি?",
      "কিয় ৯৯% মানুহ TOPIC ত ব্যৰ্থ হয়?",
      "মই ৩০ দিন ধৰি TOPIC চেষ্টা কৰিলোঁ, আচৰিত ফলাফল...",
      "TOPIC ৰ সেই গোপন ৰহস্য যিটো ডাঙৰ ক্ৰিয়েটৰসকলে লুকুৱাই ৰাখে!"
    ],
    hooks: [
      "৯৯% মানুহে TOPIC ৰ কাম কৰোঁতে এই এটা ডাঙৰ ভুল কৰে...",
      "যদি আপুনি এতিয়াও পুৰণি পদ্ধতিৰে TOPIC কৰি আছে, তেন্তে এতিয়াই বন্ধ কৰক..."
    ],
    style: "সহজ, সাবলীল আৰু মনোগ্ৰাহী অসমীয়া কথা-বতৰা।",
    angle: "জটিলতাক সহজ ৰূপলৈ আনি ক্ৰিয়েটৰসকলক অনুপ্রাণিত কৰা।",
    hookNarrator: "TOPIC ৰ বিষয়ে আপোনাক এতিয়ালৈকে কিছুমান মিছা কথা কোৱা হৈছে। বহুতে ইয়াক পৰম কঠিন বুলি দেখুৱায়, কিন্তু আজি আমি ইয়াৰ আচল ৰহস্য ফাদিল কৰিম।",
    problemNarrator: "আচল সমস্যাটো হ’ল আমি কোনো নিৰ্দিষ্ট আঁচনি নোলোৱাকৈ কামত নামি পৰোঁ আৰু তাৰ ফলতেই বিচৰা ফল নাপাওঁ।",
    solutionNarrator: "কিন্তু চিন্তা নকৰিব, কাইলৈৰ পৰা এই তিনিটা সৰু পৰিৱৰ্তন আপোনাৰ কামত ব্যৱহাৰ কৰক আৰু চাব আনতকৈ সোনকালে ফলাফল পাব।",
    outroNarrator: "যদি এই তথ্যটো ভাল লাগিছে, তেন্তে এতিয়াই চেনেলটো চাবস্ক্ৰাইব কৰক আৰু তলত কমেন্টত আপোনাৰ মতামত জনাওক!",
    textOverlay: "আচৰিত কাণ্ড!",
    voiceStyle: "Premium Assamese Accent Voice",
    seoTitle: "TOPIC ৰ ওপৰত সম্পূৰ্ণ বিশেষ আলোচনা",
    descriptionSnippet: "অসমীয়া ভাষাত TOPIC কেনেকৈ সহজে বুজি পাব তাৰ সুন্দৰ বিশ্লেষণ আগবঢ়োৱা হৈছে।"
  }
};

export function getClientMockData(
  topic: string,
  niche: NicheType,
  videoType: VideoType,
  languageCode: string
): YouTubePublishingPackage {
  const languageName = languageMap[languageCode] || "Hindi (हिन्दी)";
  
  // Retrieve localized resources or default to Hindi
  const data = localizedResources[languageCode] || localizedResources["hi"];

  // Replace 'TOPIC' with real dynamic input topic value safely
  const replaceTopic = (str: string) => str.replace(/TOPIC/g, topic);

  const titleFormulas = data.titles.map(replaceTopic);
  const hookTemplates = data.hooks.map(replaceTopic);

  const genericExplanations = [
    `Confrontational hook designed to drive major click-through rate by targeting systemic triggers in the ${niche} space.`,
    `Introduces strong urgency and psychological leverage. Perfect for keeping viewers hooked for ${niche}.`,
    `Case study format which builds organic creator credibility and instant channel authority.`,
    `Capitalizes on curiosity and knowledge gap triggers, providing a clear path of value.`,
    `Exclusivity trigger. Makes the viewer feel like they are accessing an elite circle of secrets.`
  ];

  const hookStrategies = [
    "Loss Aversion & Negative Framing",
    "Pattern Interrupt & Immediate Warning",
    "Social Proof & Metric Leverage",
    "Mystery & Dark Curiosity Loop",
    "High-Value Resource Framing"
  ];

  const shuffledIdeas = [...titleFormulas].sort(() => 0.5 - Math.random());
  const shuffledHooks = [...hookTemplates].sort(() => 0.5 - Math.random());

  return {
    topic,
    niche,
    videoType,
    generatedAt: new Date().toISOString(),
    isFallback: true,
    language: languageName,
    viralIdeas: shuffledIdeas.slice(0, 5).map((title, idx) => ({
      title,
      explanation: genericExplanations[idx] || `Specifically optimized for ${niche} viewers wanting to master ${topic}.`,
      clickabilityScore: 99 - idx - Math.floor(Math.random() * 3)
    })),
    hooks: shuffledHooks.slice(0, 5).map((hookText, idx) => ({
      hookText,
      strategy: hookStrategies[idx] || "Curiosity Loop"
    })),
    script: {
      conversationalStyle: data.style,
      storytellingAngle: replaceTopic(data.angle),
      sections: [
        {
          sectionName: videoType === VideoType.SHORTS ? "Hook (0:00 - 0:10)" : "Hook & Core Setup (0:00 - 0:30)",
          narratorText: replaceTopic(data.hookNarrator),
          visualDirection: "Fast-paced cinematic montage with glitch overlay text, ending on a high contrast close-up graphic.",
          retentionTactic: "Instant scroll stopper addressing viewers directly."
        },
        {
          sectionName: videoType === VideoType.SHORTS ? "The Twist (0:10 - 0:30)" : "The Agitation & Shock Truth (0:30 - 2:00)",
          narratorText: replaceTopic(data.problemNarrator),
          visualDirection: "Zoomed charts showing historical graphs with neon red trend lines. Stock clips of people looking confused.",
          retentionTactic: "Stakes elevation. Agitates the viewer's current pain point."
        },
        {
          sectionName: videoType === VideoType.SHORTS ? "The Solution (0:30 - 0:50)" : "Step-by-Step Resolution Pattern (2:00 - 4:15)",
          narratorText: replaceTopic(data.solutionNarrator),
          visualDirection: "Clean 3D list icons sliding onto the screen with crisp audio sound effects. Upbeat background music transitions in.",
          retentionTactic: "Delivering practical high value sequentially so they do not click away."
        },
        {
          sectionName: videoType === VideoType.SHORTS ? "Outro & Loop (0:50 - 1:00)" : "The Algorithmic Call to Action (4:15 - End)",
          narratorText: replaceTopic(data.outroNarrator),
          visualDirection: "Dynamic subscribe hover card graphic, on-screen text arrow pointing to the actual follow buttons.",
          retentionTactic: "Micro-commitment conversion loop without sounding desperate."
        }
      ]
    },
    thumbnail: {
      textOverlay: data.textOverlay,
      visualConcept: `CRITICAL HIGH-CTR COMPOSITION: A split screen with extreme visual contrast (>20:1 ratio). On the left side: A highly detailed, hyper-saturated mockup demonstrating the wrong, failing methodology for "${topic}" with a giant, glowing red 'X' graphic overlay. On the right side: A deep, dark cobalt blue gradient presenting a mysterious black-sieve silhouette of the creator looking forward with a stunning neon yellow glowing question mark centered over their chest. Use cinematic volumetric fog, sharp rim-lighting to define edges, and clean, high-clarity assets optimized for mobile feeds. The text overlay is layered in a bold, slanted impact font with thick hand-drawn black outlines, slanted at -5 degrees.`,
      emotionalTrigger: "Sincere curiosity, intense pattern interruption, and fear of missing out (FOMO)."
    },
    bRollSuggestions: [
      {
        sceneNumber: 1,
        timeframe: videoType === VideoType.SHORTS ? "0:00 - 0:15" : "0:00 - 1:00",
        visualConcept: "A dark studio with backlighting, camera slowly sliding horizontally across neon screens.",
        stockFootageKeywords: "cinematic workspace neon dark slider movement",
        cameraMovement: "Subtle slow horizontal dolly slider track"
      },
      {
        sceneNumber: 2,
        timeframe: videoType === VideoType.SHORTS ? "0:15 - 0:40" : "1:00 - 3:30",
        visualConcept: "Upclose focus of fingers typing rapidly on high-end computer terminal keys in low light.",
        stockFootageKeywords: "rapid coding keyboard dark room programmer macro",
        cameraMovement: "Tight macro zoom with very low depth of field"
      },
      {
        sceneNumber: 3,
        timeframe: videoType === VideoType.SHORTS ? "0:40 - End" : "3:30 - End",
        visualConcept: "Successful looking creator smiling subtly at the camera in a modern sleek studio setup.",
        stockFootageKeywords: "cheerful youth host podcast studio dynamic lighting",
        cameraMovement: "Steady tripod focus with minimal slow push-in"
      }
    ],
    seoPackage: {
      optimizedTitle: replaceTopic(data.seoTitle),
      videoDescription: `${replaceTopic(data.descriptionSnippet)}\n\nTimestamps:\n0:00 - Introduction\n0:15 - The Core Trap\n1:15 - The Secret Shift\n2:30 - Ultimate Action Call\n\nHope this publishing kit accelerates your channel growth!`,
      hashtags: ["#YouTubeSecrets", `#${topic.replace(/\s+/g, "")}`, "#FacelessChannel", `#${niche.toLowerCase()}`, "#CreatorAcademy"],
      seoKeywords: [`how to start a ${topic} channel`, `${niche} tube growth hacks`, `faceless ${topic} ideas`, "video script storyteller formula", "high retention youtube shorts"]
    },
    voiceInstructions: {
      recommendedVoiceStyle: `${data.voiceStyle} (${replaceTopic(data.voiceStyle)})`,
      tone: `Gravelly, suspenseful, high-conviction delivery in custom native ${languageName}`,
      pace: "135-145 words per minute, incorporating 1.5-second dramatic pauses after rhetorical hooks",
      emotion: "Intense understated urgency, total confidence, and authentic local authority"
    }
  };
}
