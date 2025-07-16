import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const handleButtonPress = (message: string) => {
    alert(message);
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
            onPress={() => handleButtonPress('זוזו ספורט - בקרוב באפליקציה!')}
          >
            <Text style={styles.buttonText}>בואו נתחיל להתאמן!</Text>
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
            onPress={() => handleButtonPress('צפה ב-37 סרטוני משפחה')}
          >
            <Text style={styles.categoryIcon}>👨‍👩‍👧‍👦</Text>
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>משפחה</Text>
              <Text style={styles.categoryDescription}>37 סרטונים</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.categoryCard, { backgroundColor: '#e91e63' }]}
            onPress={() => handleButtonPress('צפה ב-36 סרטוני ריקוד')}
          >
            <Text style={styles.categoryIcon}>💃</Text>
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>ריקוד</Text>
              <Text style={styles.categoryDescription}>36 סרטונים</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.categoryCard, { backgroundColor: '#9c27b0' }]}
            onPress={() => handleButtonPress('צפה ב-41 סרטוני כוח')}
          >
            <Text style={styles.categoryIcon}>💪</Text>
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>כוח</Text>
              <Text style={styles.categoryDescription}>41 סרטונים</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.categoryCard, { backgroundColor: '#4caf50' }]}
            onPress={() => handleButtonPress('צפה ב-25 סרטוני יוגה')}
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
            onPress={() => handleButtonPress('הורדת האפליקציה מחנות האפליקציות - בקרוב!')}
          >
            <Text style={styles.ctaButtonText}>📱 חנות האפליקציות</Text>
          </TouchableOpacity>
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

