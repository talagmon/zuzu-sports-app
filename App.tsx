import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleDownloadApp = () => {
    const isIOS = Platform.OS === 'ios' || /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = Platform.OS === 'android' || /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      Linking.openURL('https://apps.apple.com/il/app/zuzu-%D7%A1%D7%A4%D7%95%D7%A8%D7%98-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D/id6741363934?l=he');
    } else if (isAndroid) {
      Linking.openURL('https://play.google.com/store/apps/details?id=com.zuzu.sports');
    } else {
      const userChoice = confirm('בחר את החנות המתאימה:\nOK = App Store (iOS)\nCancel = Google Play (Android)');
      if (userChoice) {
        Linking.openURL('https://apps.apple.com/il/app/zuzu-%D7%A1%D7%A4%D7%95%D7%A8%D7%98-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D/id6741363934?l=he');
      } else {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.zuzu.sports');
      }
    }
  };

  const handleContactEmail = () => {
    Linking.openURL('mailto:hello@zuzusport.co.il');
  };

  const handleContactWhatsApp = () => {
    Linking.openURL('https://wa.me/972546880474');
  };

  const renderNavigation = () => (
    <View style={styles.navigation}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navScroll}>
        <TouchableOpacity 
          style={[styles.navButton, currentPage === 'home' && styles.navButtonActive]}
          onPress={() => setCurrentPage('home')}
        >
          <Text style={[styles.navText, currentPage === 'home' && styles.navTextActive]}>דף הבית</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButton, currentPage === 'about' && styles.navButtonActive]}
          onPress={() => setCurrentPage('about')}
        >
          <Text style={[styles.navText, currentPage === 'about' && styles.navTextActive]}>אודות</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButton, currentPage === 'workouts' && styles.navButtonActive]}
          onPress={() => setCurrentPage('workouts')}
        >
          <Text style={[styles.navText, currentPage === 'workouts' && styles.navTextActive]}>סוגי אימונים</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButton, currentPage === 'rewards' && styles.navButtonActive]}
          onPress={() => setCurrentPage('rewards')}
        >
          <Text style={[styles.navText, currentPage === 'rewards' && styles.navTextActive]}>מערכת פרסים</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButton, currentPage === 'testimonials' && styles.navButtonActive]}
          onPress={() => setCurrentPage('testimonials')}
        >
          <Text style={[styles.navText, currentPage === 'testimonials' && styles.navTextActive]}>המלצות</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButton, currentPage === 'faq' && styles.navButtonActive]}
          onPress={() => setCurrentPage('faq')}
        >
          <Text style={[styles.navText, currentPage === 'faq' && styles.navTextActive]}>שאלות נפוצות</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButton, currentPage === 'contact' && styles.navButtonActive]}
          onPress={() => setCurrentPage('contact')}
        >
          <Text style={[styles.navText, currentPage === 'contact' && styles.navTextActive]}>צור קשר</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderHomePage = () => (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>זוזו ספורט לילדים</Text>
        <Text style={styles.heroSubtitle}>מהפכה בעולם הכושר לילדים!</Text>
        <Text style={styles.heroDescription}>
          בעידן הדיגיטלי, כשילדים מבלים שעות רבות מול מסכים, זוזו מספקת פתרון יצירתי וחדשני. 
          האפליקציה שלנו הופכת את זמן המסך לזמן פעילות, משלבת טכנולוגיה מתקדמת עם תרגילי כושר מהנים ובטוחים.
        </Text>
        <TouchableOpacity style={styles.heroButton} onPress={handleDownloadApp}>
          <Text style={styles.heroButtonText}>הורד את האפליקציה עכשיו!</Text>
        </TouchableOpacity>
      </View>

      {/* Why ZuzU Works */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>למה זוזו עובדת?</Text>
        <Text style={styles.sectionSubtitle}>מדע מאחורי הכיף:</Text>
        
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>⏰</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>5 דקות ביום</Text>
            <Text style={styles.featureDescription}>מספיקות כדי ליצור הרגל בריא לכל החיים</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🏆</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>מערכת תגמול מתקדמת</Text>
            <Text style={styles.featureDescription}>כל אימון מזכה בנקודות ופרסים וירטואליים</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🎯</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>התאמה אישית</Text>
            <Text style={styles.featureDescription}>האפליקציה מתאימה עצמה לרמה ולגיל של כל ילד</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🏠</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>אין צורך בציוד</Text>
            <Text style={styles.featureDescription}>רק מקום קטן בבית ונכונות לזוז</Text>
          </View>
        </View>
      </View>

      {/* Health Benefits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>היתרונות הבריאותיים</Text>
        <Text style={styles.sectionSubtitle}>מה שההורים רואים:</Text>
        
        <View style={styles.benefitsList}>
          <Text style={styles.benefitItem}>• שיפור ביציבה ובכוח הליבה</Text>
          <Text style={styles.benefitItem}>• עלייה ברמת הביטחון העצמי</Text>
          <Text style={styles.benefitItem}>• שיפור בריכוז ובקשב</Text>
          <Text style={styles.benefitItem}>• הפחתה במתח ובחרדה</Text>
          <Text style={styles.benefitItem}>• פיתוח הרגלים בריאים לחיים</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>הנתונים שלנו</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50K+</Text>
            <Text style={styles.statLabel}>ילדים פעילים</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2M+</Text>
            <Text style={styles.statLabel}>אימונים בוצעו</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>95%</Text>
            <Text style={styles.statLabel}>שיפור בכושר</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>87%</Text>
            <Text style={styles.statLabel}>שיפור בביטחון</Text>
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>מוכנים להתחיל?</Text>
        <Text style={styles.ctaDescription}>הורידו את האפליקציה עכשיו והתחילו למסע כושר מהנה!</Text>
        <TouchableOpacity style={styles.ctaButton} onPress={handleDownloadApp}>
          <Text style={styles.ctaButtonText}>📱 הורד את האפליקציה</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderAboutPage = () => (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>הסיפור שלנו</Text>
        <Text style={styles.pageSubtitle}>איך זוזו נולדה?</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bodyText}>
          זוזו נוסדה על ידי צוות של מומחי כושר, פסיכולוגים התפתחותיים ומפתחי אפליקציות, 
          שהבינו שילדים בעידן הדיגיטלי זקוקים לפתרון חדשני לעידוד פעילות גופנית.
        </Text>
        
        <Text style={styles.sectionTitle}>המשימה שלנו:</Text>
        <Text style={styles.bodyText}>
          להפוך כל ילד לגיבור של הסיפור שלו, דרך תנועה מהנה ומאתגרת. 
          אנחנו מאמינים שכושר גופני לא צריך להיות מלחיץ או משעמם - הוא יכול להיות הרפתקה מרתקת.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>הצוות שלנו</Text>
        <Text style={styles.sectionSubtitle}>מומחים שדואגים לילדים שלכם:</Text>
        
        <View style={styles.teamList}>
          <Text style={styles.teamItem}>• מומחי כושר מוסמכים המתמחים בילדים</Text>
          <Text style={styles.teamItem}>• פסיכולוגים התפתחותיים</Text>
          <Text style={styles.teamItem}>• מעצבי משחקים</Text>
          <Text style={styles.teamItem}>• מפתחי אפליקציות מנוסים</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>הערכים שלנו</Text>
        
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🛡️</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>בטיחות קודם כל</Text>
            <Text style={styles.featureDescription}>כל תרגיל נבדק על ידי מומחים</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🎮</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>כיף במרכז</Text>
            <Text style={styles.featureDescription}>למידה דרך משחק</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🤝</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>הכללה</Text>
            <Text style={styles.featureDescription}>מתאים לכל ילד, בכל רמה</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>⭐</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>איכות</Text>
            <Text style={styles.featureDescription}>תוכן מקצועי ואמין</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderWorkoutsPage = () => (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>מגוון האימונים שלנו</Text>
      </View>

      <TouchableOpacity style={[styles.workoutCard, { backgroundColor: '#ff6b35' }]} onPress={handleDownloadApp}>
        <Text style={styles.workoutIcon}>💪</Text>
        <View style={styles.workoutContent}>
          <Text style={styles.workoutTitle}>אימוני כח</Text>
          <Text style={styles.workoutSubtitle}>בניית שרירים בדרך כיפית</Text>
          <Text style={styles.workoutDescription}>
            • תרגילי משקל גוף מותאמים לגיל{'\n'}
            • פיתוח כח הליבה והיציבה{'\n'}
            • שיפור הכוח הפונקציונלי{'\n'}
            • בניית ביטחון גופני
          </Text>
          <Text style={styles.workoutDetails}>מתאים לגילאים: 6-16 | משך: 3-8 דקות</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.workoutCard, { backgroundColor: '#4caf50' }]} onPress={handleDownloadApp}>
        <Text style={styles.workoutIcon}>🧘</Text>
        <View style={styles.workoutContent}>
          <Text style={styles.workoutTitle}>יוגה לילדים</Text>
          <Text style={styles.workoutSubtitle}>רגיעה ומיקוד בדרך מהנה</Text>
          <Text style={styles.workoutDescription}>
            • שיפור הגמישות והיציבה{'\n'}
            • טכניקות נשימה מרגיעות{'\n'}
            • פיתוח מיקוד וריכוז{'\n'}
            • הפחתת מתח וחרדה
          </Text>
          <Text style={styles.workoutDetails}>מתאים לגילאים: 5-16 | משך: 5-10 דקות</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.workoutCard, { backgroundColor: '#e91e63' }]} onPress={handleDownloadApp}>
        <Text style={styles.workoutIcon}>🕺</Text>
        <View style={styles.workoutContent}>
          <Text style={styles.workoutTitle}>ברייקדאנס</Text>
          <Text style={styles.workoutSubtitle}>ביטוי עצמי דרך תנועה</Text>
          <Text style={styles.workoutDescription}>
            • פיתוח קואורדינציה{'\n'}
            • שיפור הקצב והתיאום{'\n'}
            • בניית ביטחון עצמי{'\n'}
            • הבעה יצירתית
          </Text>
          <Text style={styles.workoutDetails}>מתאים לגילאים: 7-16 | משך: 4-7 דקות</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.workoutCard, { backgroundColor: '#9c27b0' }]} onPress={handleDownloadApp}>
        <Text style={styles.workoutIcon}>🤸</Text>
        <View style={styles.workoutContent}>
          <Text style={styles.workoutTitle}>תרגילי קרקע</Text>
          <Text style={styles.workoutSubtitle}>יסודות התעמלות בבית</Text>
          <Text style={styles.workoutDescription}>
            • פיתוח גמישות וכוח{'\n'}
            • שיפור האיזון והתיאום{'\n'}
            • בניית משמעת ודיוק{'\n'}
            • הכנה לספורט מתקדם
          </Text>
          <Text style={styles.workoutDetails}>מתאים לגילאים: 6-16 | משך: 5-10 דקות</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.workoutCard, { backgroundColor: '#ff9800' }]} onPress={handleDownloadApp}>
        <Text style={styles.workoutIcon}>👨‍👩‍👧‍👦</Text>
        <View style={styles.workoutContent}>
          <Text style={styles.workoutTitle}>אימונים משפחתיים</Text>
          <Text style={styles.workoutSubtitle}>בילוי איכות עם פעילות</Text>
          <Text style={styles.workoutDescription}>
            • חיזוק הקשר המשפחתי{'\n'}
            • יצירת זיכרונות חיוביים{'\n'}
            • עידוד הדדי והשראה{'\n'}
            • בניית הרגלים משפחתיים בריאים
          </Text>
          <Text style={styles.workoutDetails}>מתאים לגילאים: כל המשפחה | משך: 7-15 דקות</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderRewardsPage = () => (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>איך עובדת מערכת התגמול?</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 נקודות ורמות</Text>
        <Text style={styles.sectionSubtitle}>כל אימון מזכה בנקודות:</Text>
        
        <View style={styles.rewardsList}>
          <Text style={styles.rewardItem}>• 10 נקודות עבור השלמת אימון</Text>
          <Text style={styles.rewardItem}>• 20 נקודות עבור אימון רצוף במשך 3 ימים</Text>
          <Text style={styles.rewardItem}>• 50 נקודות עבור אימון שבועי רצוף</Text>
          <Text style={styles.rewardItem}>• 100 נקודות עבור אימון חודשי רצוף</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 תגים ופרסים</Text>
        <Text style={styles.sectionSubtitle}>הישגים מיוחדים:</Text>
        
        <View style={styles.badgesList}>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🌅</Text>
            <Text style={styles.badgeTitle}>חלוץ הבוקר</Text>
            <Text style={styles.badgeDesc}>אימון לפני השעה 8:00</Text>
          </View>
          
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🌙</Text>
            <Text style={styles.badgeTitle}>גיבור הערב</Text>
            <Text style={styles.badgeDesc}>אימון אחרי השעה 17:00</Text>
          </View>
          
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>💪</Text>
            <Text style={styles.badgeTitle}>אלוף הכח</Text>
            <Text style={styles.badgeDesc}>50 אימוני כח</Text>
          </View>
          
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🧘</Text>
            <Text style={styles.badgeTitle}>מלך/מלכת היוגה</Text>
            <Text style={styles.badgeDesc}>30 אימוני יוגה</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎁 פרסים מיוחדים</Text>
        <Text style={styles.sectionSubtitle}>מה זוכים:</Text>
        
        <View style={styles.prizesList}>
          <Text style={styles.prizeItem}>• אוספי מדבקות דיגיטליות</Text>
          <Text style={styles.prizeItem}>• דמויות אווטר מיוחדות</Text>
          <Text style={styles.prizeItem}>• אימונים בלעדיים</Text>
          <Text style={styles.prizeItem}>• הקדשות אישיות מהצוות</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>הסיבות מאחורי הפרסים</Text>
        <Text style={styles.sectionSubtitle}>למה מערכת התגמול עובדת:</Text>
        
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>💝</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>מוטיבציה פנימית</Text>
            <Text style={styles.featureDescription}>יצירת רצון פנימי להתאמן</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🏆</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>תחושת הישג</Text>
            <Text style={styles.featureDescription}>כל פרס הוא הכרה בהתמדה</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🔄</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>בניית הרגלים</Text>
            <Text style={styles.featureDescription}>תגמול עוזר ליצור שגרה חיובית</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>😊</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>כיף בתהליך</Text>
            <Text style={styles.featureDescription}>הפיכת האימון לחוויה מהנה</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderTestimonialsPage = () => (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>מה אומרים עלינו?</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👩‍🏫 המלצות מחנכים</Text>
        
        <View style={styles.testimonial}>
          <Text style={styles.testimonialTitle}>"זוזו שינתה את האווירה בכיתה"</Text>
          <Text style={styles.testimonialText}>
            "בתור מחנכת כיתה ג', אני רואה כל יום איך זוזו עוזרת לילדים שלי לשחרר אנרגיה ולחזור למיקוד. 
            5 דקות של זוזו שוות כמו הפסקה ארוכה."
          </Text>
          <Text style={styles.testimonialAuthor}>- רחל כ., מחנכת בית ספר יסודי, חיפה</Text>
        </View>

        <View style={styles.testimonial}>
          <Text style={styles.testimonialTitle}>"הפתרון שחיפשנו"</Text>
          <Text style={styles.testimonialText}>
            "הוספנו את זוזו לשגרת הכיתה שלנו וזה פשוט מדהים. הילדים מתרגשים מכל אימון חדש ומבקשים 'עוד זוזו' כל הזמן."
          </Text>
          <Text style={styles.testimonialAuthor}>- דני ר., מורה לחינוך גופני, באר שבע</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👨‍⚕️ המלצות מומחים</Text>
        
        <View style={styles.testimonial}>
          <Text style={styles.testimonialTitle}>"מבחינה מקצועית - מצוין"</Text>
          <Text style={styles.testimonialText}>
            "בתור פיזיותרפיסט ילדים, אני רואה שיפור משמעותי בילדים שמשתמשים בזוזו. 
            יציבה טובה יותר, פחות כאבי גב וביטחון גופני גבוה יותר."
          </Text>
          <Text style={styles.testimonialAuthor}>- ד"ר משה לוי, פיזיותרפיסט ילדים</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👪 עדויות הורים</Text>
        
        <View style={styles.testimonial}>
          <Text style={styles.testimonialTitle}>"הבת שלי הפכה לספורטאית"</Text>
          <Text style={styles.testimonialText}>
            "מיה בת ה-9 שלי הייתה ילדה מאוד רגועה שלא אהבה לזוז. 
            אחרי חודש עם זוזו, היא מבקשת ללכת לחוג התעמלות! התמורה מדהימה."
          </Text>
          <Text style={styles.testimonialAuthor}>- יעל ד., רמת גן</Text>
        </View>

        <View style={styles.testimonial}>
          <Text style={styles.testimonialTitle}>"פתרון מושלם למשפחה עמוסה"</Text>
          <Text style={styles.testimonialText}>
            "עם שני ילדים ולוחות זמנים מטורפים, זוזו הפכה להצלה שלנו. 
            5 דקות בבוקר ואנחנו כבר מתחילים את היום בחיוך."
          </Text>
          <Text style={styles.testimonialAuthor}>- אבי ס., ירושלים</Text>
        </View>

        <View style={styles.testimonial}>
          <Text style={styles.testimonialTitle}>"הילדים שלי התחרו מי יעשה יותר אימונים"</Text>
          <Text style={styles.testimonialText}>
            "בהתחלה חשבתי שזה עוד אפליקציה, אבל הילדים שלי (10 ו-12) פשוט התאהבו. 
            עכשיו הם מתחרים מי יעשה יותר אימונים בשבוע!"
          </Text>
          <Text style={styles.testimonialAuthor}>- מירי ח., נתניה</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderFAQPage = () => (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>השאלות שאתם הכי שואלים</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.faqQuestion}>🤔 האם זוזו מתאימה לכל הילדים?</Text>
        <Text style={styles.faqAnswer}>
          כן! זוזו מיועדת לילדים בגילאי 5-16. האפליקציה מציעה אימונים ברמות שונות המתאימות לכל גיל ורמת כושר. 
          יש לנו אימונים עדינים לילדים קטנים ואתגרים מתקדמים יותר לנוער.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.faqQuestion}>💰 כמה עולה זוזו?</Text>
        <Text style={styles.faqAnswer}>
          זוזו מציעה מודל מנוי גמיש:{'\n'}
          • ניסיון חינם למשך 7 ימים{'\n'}
          • מנוי חודשי: ₪29.90{'\n'}
          • מנוי שנתי: ₪199.90 (חיסכון של 44%!){'\n'}
          • מנוי משפחתי (עד 4 ילדים): ₪39.90/חודש
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.faqQuestion}>📱 על אילו מכשירים זוזו עובדת?</Text>
        <Text style={styles.faqAnswer}>
          זוזו זמינה עבור:{'\n'}
          • iPhone (iOS 12 ומעלה){'\n'}
          • Android (גרסה 6.0 ומעלה){'\n'}
          • iPad ו-Tablet{'\n'}
          • בקרוב: אפליקציית טלוויזיה חכמה
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.faqQuestion}>🏠 כמה מקום דרוש לאימונים?</Text>
        <Text style={styles.faqAnswer}>
          מספיק מקום קטן בבית! רוב האימונים דורשים שטח של 2x2 מטר בלבד. 
          אנחנו מספקים גם אימונים מיוחדים לחללים קטנים יותר.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.faqQuestion}>🔒 האם זוזו בטוחה לילדים?</Text>
        <Text style={styles.faqAnswer}>
          בטיחות הילדים היא העדיפות הראשונה שלנו:{'\n'}
          • כל התרגילים נבדקים על ידי מומחי כושר מוסמכים{'\n'}
          • הוראות בטיחות ברורות לפני כל אימון{'\n'}
          • מערכת דיווח על פציעות{'\n'}
          • תמיכה מקצועית 24/7
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.faqQuestion}>🎯 האם יש התאמה אישית?</Text>
        <Text style={styles.faqAnswer}>
          כן! זוזו לומדת את הילד שלכם:{'\n'}
          • מערכת בינה מלאכותית שמתאימה את הקושי{'\n'}
          • מעקב אחר התקדמות אישית{'\n'}
          • המלצות מותאמות אישית{'\n'}
          • יעדים מותאמים לגיל ויכולות
        </Text>
      </View>
    </ScrollView>
  );

  const renderContactPage = () => (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>אנחנו כאן בשבילכם!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📞 דרכי התקשרות</Text>
        <Text style={styles.sectionSubtitle}>צריכים עזרה? יש לנו מספר דרכים להגיע אלינו:</Text>
        
        <TouchableOpacity style={styles.contactItem} onPress={handleContactEmail}>
          <Text style={styles.contactIcon}>📧</Text>
          <View style={styles.contactContent}>
            <Text style={styles.contactTitle}>תמיכה טכנית</Text>
            <Text style={styles.contactText}>hello@zuzusport.co.il</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleContactWhatsApp}>
          <Text style={styles.contactIcon}>📱</Text>
          <View style={styles.contactContent}>
            <Text style={styles.contactTitle}>טלפון</Text>
            <Text style={styles.contactText}>054-6880474</Text>
            <Text style={styles.contactSubtext}>ראשון-חמישי, 9:00-18:00</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏫 זוזו בבתי ספר</Text>
        <Text style={styles.bodyText}>
          מעוניינים להביא את זוזו לבית הספר?{'\n'}
          • תוכנית מיוחדת לבתי ספר{'\n'}
          • הכשרה למורים{'\n'}
          • מחירים מיוחדים למוסדות חינוך{'\n'}
          • צרו קשר: hello@zuzusport.co.il
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👨‍⚕️ מומחי בריאות</Text>
        <Text style={styles.bodyText}>
          אתם מומחה בריאות ורוצים לשלב זוזו בטיפול?{'\n'}
          • תוכנית שותפות למומחים{'\n'}
          • כלים מקצועיים למעקב{'\n'}
          • הדרכות מקצועיות{'\n'}
          • צרו קשר: hello@zuzusport.co.il
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 מרכז עזרה</Text>
        <Text style={styles.bodyText}>
          שאלות נפוצות וידאו מדריכים:{'\n'}
          • איך מתחילים עם זוזו?{'\n'}
          • פתרון בעיות טכניות{'\n'}
          • עדכון פרטי התשלום{'\n'}
          • מדריך לבטיחות
        </Text>
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>מוכנים להתחיל?</Text>
        <Text style={styles.ctaDescription}>הורידו את האפליקציה עכשיו!</Text>
        <TouchableOpacity style={styles.ctaButton} onPress={handleDownloadApp}>
          <Text style={styles.ctaButtonText}>📱 הורד את האפליקציה</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return renderHomePage();
      case 'about': return renderAboutPage();
      case 'workouts': return renderWorkoutsPage();
      case 'rewards': return renderRewardsPage();
      case 'testimonials': return renderTestimonialsPage();
      case 'faq': return renderFAQPage();
      case 'contact': return renderContactPage();
      default: return renderHomePage();
    }
  };

  return (
    <View style={styles.container}>
      {renderNavigation()}
      {renderCurrentPage()}
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 זוזו ספורט - כל הזכויות שמורות</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  navigation: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0ff',
  },
  navScroll: {
    paddingHorizontal: 10,
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0ff',
  },
  navButtonActive: {
    backgroundColor: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
  },
  navText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  navTextActive: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  hero: {
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
  },
  heroDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
    lineHeight: 24,
  },
  heroButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  heroButtonText: {
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pageHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    marginBottom: 10,
  },
  pageSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
    color: '#555',
  },
  bodyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    lineHeight: 24,
    marginBottom: 15,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#ff6ec7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'right',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  benefitsList: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#ff6ec7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitItem: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    marginBottom: 8,
    lineHeight: 22,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 100,
    margin: 5,
    shadowColor: '#ff6ec7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  workoutCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    shadowColor: '#ff6ec7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutIcon: {
    fontSize: 40,
    marginRight: 20,
  },
  workoutContent: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'right',
  },
  workoutSubtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    textAlign: 'right',
    opacity: 0.9,
  },
  workoutDescription: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
    textAlign: 'right',
    opacity: 0.9,
    lineHeight: 20,
  },
  workoutDetails: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    opacity: 0.8,
    fontStyle: 'italic',
  },
  rewardsList: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#ff6ec7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardItem: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    marginBottom: 8,
    lineHeight: 22,
  },
  badgesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  badge: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 120,
    margin: 5,
    shadowColor: '#ff6ec7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    marginBottom: 5,
  },
  badgeDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  prizesList: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#ff6ec7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prizeItem: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    marginBottom: 8,
    lineHeight: 22,
  },
  testimonial: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#ff6ec7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testimonialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'right',
    marginBottom: 10,
  },
  testimonialText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    lineHeight: 24,
    marginBottom: 10,
  },
  testimonialAuthor: {
    fontSize: 14,
    color: '#999',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  faqItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#ff6ec7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'right',
    marginBottom: 10,
  },
  faqAnswer: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#ff6ec7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'right',
    marginBottom: 5,
  },
  contactText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  contactSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'right',
    marginTop: 2,
  },
  teamList: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#ff6ec7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamItem: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    marginBottom: 8,
    lineHeight: 22,
  },
  ctaSection: {
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  ctaButtonText: {
    background: 'linear-gradient(135deg, #ff6ec7 0%, #4facfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0ff',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

