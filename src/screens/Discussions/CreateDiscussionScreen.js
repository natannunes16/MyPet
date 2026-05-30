import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { colors } from '../../theme/colors';
import { useFeed } from '../../context/FeedContext';
import { usePet } from '../../context/PetContext';
import { Ionicons } from '@expo/vector-icons';
import MainHeader from '../../components/Header/MainHeader';

export default function CreateDiscussionScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Saúde');
  const [content, setContent] = useState('');
  const { addDiscussion } = useFeed();
  const { profile } = usePet();

  const categories = ['Saúde', 'Alimentação', 'Comportamento', 'Geral'];

  const handlePost = () => {
    if (!content.trim() || !title.trim()) {
      alert('Preencha o título e os detalhes!');
      return;
    }

    const newDiscussion = {
      id: 'd_' + Date.now(),
      title: title.trim(),
      content: content.trim(),
      author: profile.name || 'Você',
      avatar: profile.avatar || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      time: 'agora',
      category: category,
      likes: 0,
      comments: []
    };

    addDiscussion(newDiscussion);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader showBack={true} navigation={navigation} hasUnreadNotifications={true} />

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.pageTitle}>Criar discussão</Text>
          <Text style={styles.pageSubtitle}>
            Compartilhe suas dúvidas e relatos com a comunidade.
          </Text>

          <View style={styles.formCard}>
            
            {/* Título */}
            <Text style={styles.label}>Título da discussão</Text>
            <TextInput
              style={styles.input}
              placeholder="Título da dúvida ou relato"
              placeholderTextColor="#9E9E9E"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />

            {/* Categoria */}
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryPill, category === cat && styles.categoryPillActive]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Detalhes */}
            <Text style={styles.label}>Detalhes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva sua situação..."
              placeholderTextColor="#9E9E9E"
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
            />

            {/* Botão Publicar */}
            <TouchableOpacity 
              style={[
                styles.publishBtn, 
                (!content.trim() || !title.trim()) && styles.publishBtnDisabled
              ]} 
              onPress={handlePost}
              disabled={!content.trim() || !title.trim()}
            >
              <Ionicons name="send-outline" size={20} color="#000" style={{ marginRight: 8 }} />
              <Text style={styles.publishBtnText}>Publicar tópico</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#FAFAFA',
    marginBottom: 16,
  },
  textArea: {
    height: 140,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryPill: {
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
  },
  categoryPillActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  categoryText: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  publishBtn: {
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  publishBtnDisabled: {
    backgroundColor: '#FFE57F',
    opacity: 0.7,
  },
  publishBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
