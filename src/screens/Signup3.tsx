import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from "react-native"; // 🔥 TouchableWithoutFeedback, Keyboard 추가
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore'; // 🔥 updateDoc 대신 setDoc 임포트
import AsyncStorage from "@react-native-async-storage/async-storage"; 

/* ---------------- styled-components (기존 유지) ---------------- */
const Container = styled.View` flex: 1; justify-content: center; alignItems: center; background-color: #ffffff; padding: 0 30px; `;
const LogoText = styled.Text` font-size: 18px; fontWeight: bold; color: #333333; text-align: center; `;
const SubText = styled.Text` font-size: 12px; color: #666666; text-align: center; margin-bottom: 40px; `;
const Label = styled.Text` font-size: 16px; fontWeight: bold; color: #000000; text-align: center; margin-bottom: 16px; `;
const InputRow = styled.View` flexDirection: row; alignItems: center; justifyContent: center; width: 100%; margin-bottom: 10px; `;
const Input = styled.TextInput` flex: 1; height: 44px; border-width: 1px; border-color: #cccccc; border-radius: 10px; padding: 0 12px; font-size: 15px; margin-right: 10px; `;
const AddButton = styled.TouchableOpacity` background-color: #4f7b6c; padding: 10px 16px; border-radius: 10px; `;
const AddButtonText = styled.Text` color: white; font-size: 14px; font-weight: bold; `;
const TagContainer = styled.View` flexDirection: row; flex-wrap: wrap; justifyContent: center; margin-bottom: 40px; gap: 8px; `; 
const TagWrapper = styled.TouchableOpacity` background-color: #c8d9c4; padding: 8px 14px; border-radius: 20px; `;
const TagText = styled.Text` color: #2f4f4f; font-size: 14px; font-weight: 500; `;
const Button = styled.TouchableOpacity` width: 140px; height: 44px; background-color: #4f7b6c; border-radius: 22px; justify-content: center; alignItems: center; `;
const ButtonText = styled.Text` color: white; font-size: 15px; font-weight: bold; `;
/* ----------------------------------------------------- */

export default function Signup3({ navigation, route }: { navigation: any, route: any }) {
  const { userId } = route.params || {};
  
  const [inputText, setInputText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addTag = () => {
    if (inputText.trim() === "") return;
    const newTag = `#${inputText.trim()}`;
    if (!tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setInputText("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // 1. Firestore 업데이트 (DB 안정화: setDoc + merge 사용)
      if (userId) {
        const userRef = doc(db, "users", userId);
        
        // 🔥 [수정] 문서가 없으면 생성하고, 있으면 tags 필드를 업데이트합니다.
        await setDoc(userRef, { 
          tags: tags 
        }, { merge: true }); 
      }

      // 2. 로컬 저장소에 태그 저장 (마이페이지 연동용)
      await AsyncStorage.setItem("userTags", JSON.stringify(tags));

      Alert.alert("환영합니다!", "회원가입이 완료되었습니다.");
      
      // 로그인 후, 메인 화면으로 이동 (스택 초기화)
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });

    } catch (error) {
      // Firestore 저장 실패 시 Alert 대신 console.error만 남기고 로컬 저장소에 의존하여 진행
      console.error("Firestore 저장 실패, 로컬 저장소로 대체:", error);
      
      // 로컬 저장소에 저장 (AsyncStorage)
      await AsyncStorage.setItem("userTags", JSON.stringify(tags));
      
      Alert.alert("환영합니다!", "회원가입이 완료되었습니다.");
      navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <LogoText>크루핏</LogoText>
        <SubText>CREW.FIT{"\n"}체육진흥공단 DATA</SubText>

        <Label>자신을 표현할 수 있는 키워드를 입력해주세요!</Label>

        <InputRow>
          <Input 
            placeholder="ex) 런린이, 배드민턴"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addTag}
            editable={!loading}
          />
          <AddButton onPress={addTag} disabled={loading}>
            <AddButtonText>추가</AddButtonText>
          </AddButton>
        </InputRow>

        <TagContainer>
          {tags.map((tag) => (
            <TagWrapper key={tag} onPress={() => removeTag(tag)}>
              <TagText>{tag} (x)</TagText>
            </TagWrapper>
          ))}
        </TagContainer>

        <Button onPress={handleComplete} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" size="small" /> : <ButtonText>회원가입 완료</ButtonText>}
        </Button>
      </Container>
    </TouchableWithoutFeedback>
  );
}