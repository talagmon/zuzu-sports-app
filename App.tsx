import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';

export default function App() {
  const handleDownloadApp = () => {
    // Detect platform and redirect to appropriate store
    const isIOS = Platform.OS === 'ios' || /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = Platform.OS === 'android' || /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      Linking.openURL('https://apps.apple.com/il/app/zuzu-%D7%A1%D7%A4%D7%95%D7%A8%D7%98-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D/id6741363934?l=he');
    } else if (isAndroid) {
      Linking.openURL('https://play.google.com/store/apps/details?id=com.zuzu.sports');
    } else {
      // For web browsers, show both options
      const userChoice = confirm('בחר את החנות המתאימה:\nOK = App Store (iOS)\nCancel = Google Play (Android)');
      if (userChoice) {
        Linking.openURL('https://apps.apple.com/il/app/zuzu-%D7%A1%D7%A4%D7%95%D7%A8%D7%98-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D/id6741363934?l=he');
      } else {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.zuzu.sports');
      }
    }
  };

  const handleCategoryPress = (category: string) => {
    // Direct to app download for specific category
    alert(`הורד את האפליקציה כדי לצפות ב${category}!`);
    setTimeout(() => {
      handleDownloadApp();
    }, 1000);
  };

  const handleContactEmail = () => {
    Linking.openURL('mailto:hello@zuzu-apps.com');
  };

  const handleContactWhatsApp = () => {
    Linking.openURL('https://wa.me/972546880474');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>זוזו ספורט לילדים</Text>
          <Text style={styles.subtitle}>אפליקציית כושר מהנה לילדים בגילאי 6-12</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleDownloadApp}
          >
            <Text style={styles.buttonText}>הורד את האפליקציה עכשיו!</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>למה זוזו ספורט?</Text>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🎮</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>משחקי כושר מהנים</Text>
              <Text style={styles.featureDescription}>פעילויות אינטראקטיביות שהופכות את הספורט למשחק מהנה</Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>👨‍👩‍👧‍👦</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>פעילות משפחתית</Text>
              <Text style={styles.featureDescription}>תרגילים שכל המשפחה יכולה לעשות יחד</Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🏃‍♀️</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>מגוון פעילויות</Text>
              <Text style={styles.featureDescription}>יוגה, ריקוד, כוח, ועוד הרבה אפשרויות מהנות</Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🛡️</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>בטוח לילדים</Text>
              <Text style={styles.featureDescription}>תרגילים מותאמים לגיל עם הנחיות בטיחות ברורות</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>הנתונים שלנו</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>300+</Text>
              <Text style={styles.statLabel}>סרטוני אימון</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>50K+</Text>
              <Text style={styles.statLabel}>ילדים פעילים</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>קטגוריות ספורט</Text>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>קטגוריות אימון</Text>
          
          <TouchableOpacity 
            style={[styles.categoryCard, { backgroundColor: '#ff6b35' }]}
            onPress={() => handleCategoryPress('סרטוני משפחה')}
          >
            <Text style={styles.categoryIcon}>👨‍👩‍👧‍👦</Text>
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>משפחה</Text>
              <Text style={styles.categoryDescription}>37 סרטונים</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.categoryCard, { backgroundColor: '#e91e63' }]}
            onPress={() => handleCategoryPress('סרטוני ריקוד')}
          >
            <Text style={styles.categoryIcon}>💃</Text>
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>ריקוד</Text>
              <Text style={styles.categoryDescription}>36 סרטונים</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.categoryCard, { backgroundColor: '#9c27b0' }]}
            onPress={() => handleCategoryPress('סרטוני כוח')}
          >
            <Text style={styles.categoryIcon}>💪</Text>
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>כוח</Text>
              <Text style={styles.categoryDescription}>41 סרטונים</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.categoryCard, { backgroundColor: '#4caf50' }]}
            onPress={() => handleCategoryPress('סרטוני יוגה')}
          >
            <Text style={styles.categoryIcon}>🧘</Text>
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>יוגה</Text>
              <Text style={styles.categoryDescription}>25 סרטונים</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>מוכנים להתחיל?</Text>
          <Text style={styles.ctaDescription}>הורידו את האפליקציה עכשיו והתחילו למסע כושר מהנה!</Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={handleDownloadApp}
          >
            <Text style={styles.ctaButtonText}>📱 הורד את האפליקציה</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>צור קשר</Text>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={handleContactEmail}
          >
            <Text style={styles.contactIcon}>📧</Text>
            <Text style={styles.contactText}>hello@zuzu-apps.com</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={handleContactWhatsApp}
          >
            <Text style={styles.contactIcon}>📱</Text>
            <Text style={styles.contactText}>054-6880474</Text>
          </TouchableOpacity>

          <Text style={styles.contactNote}>אל תהססו לפנות אלינו בכל שאלה!</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 זוזו ספורט - כל הזכויות שמורות</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    direction: 'rtl',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    backgroundColor: '#ff6b35',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#ff6b35',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
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
    color: '#333',
    textAlign: 'right',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  categoryIcon: {
    fontSize: 40,
    marginRight: 20,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'right',
  },
  categoryDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    textAlign: 'right',
  },
  ctaSection: {
    backgroundColor: '#9c27b0',
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
    color: '#9c27b0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contactSection: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  contactIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  contactNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

