import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Modal, Portal, Button, PaperProvider } from "react-native-paper";
import { width, height, totalSize } from "react-native-dimension";
import { AntDesign } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useToast } from "react-native-toast-notifications";

import AppText from "../components/AppText";
import AppInput from "../components/AppInput";

import colors from "../config/colors";
import {
  removeSingleNote,
  storeNote,
  getNote,
  removeNote,
} from "../config/storage";

export default function MyNotesScreen() {
  const toast = useToast();
  const [notes, setNotes] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editedNote, setEditedNote] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: colors.dark.primary,
    padding: width(5),
    margin: width(5),
    borderRadius: 10,
  };

  const handleDelete = async (note) => {
    const newNotes = await removeSingleNote(note);
    setNotes(newNotes);
  };

  const handleSubmitEditing = () => {
    if (!editedNote) return;
    if (notes.includes(editedNote)) {
      toast.show("Note already exists", {
        type: "danger",
        placement: "top",
        duration: 1000,
      });
      setEditedNote("");
      return;
    }
    const newNotes = notes.map((note) =>
      note === selectedNote ? editedNote : note
    );
    setNotes(newNotes);
    storeNote(newNotes);
    setEditedNote("");
    hideModal();
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All",
      "Are you sure you want to clear all notes?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            removeNote();
            setNotes([]);
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const getNotes = async () => {
      const notes = await getNote();
      if (notes) {
        setNotes(notes);
      }
    };
    getNotes();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <AppText style={styles.headerTitle}>My Notes</AppText>

        <View style={styles.inputContainer}>
          <AppInput
            placeholder="Add a note"
            value={userInput}
            onChangeText={(text) => setUserInput(text)}
            onSubmitEditing={() => {
              if (!userInput) return;
              if (notes.includes(userInput)) {
                toast.show("Note already exists", {
                  type: "danger",
                  placement: "top",
                  duration: 1000,
                });
                setUserInput("");
                return;
              }
              setNotes([...notes, userInput]);
              storeNote([...notes, userInput]);
              setUserInput("");
            }}
            squared
          />
        </View>

        <View style={styles.notesContainer}>
          {notes.length > 5 && (
            <Button
              mode="contained"
              onPress={handleClearAll}
              style={styles.clearButton}
            >
              Clear All
            </Button>
          )}
          <FlashList
            data={notes}
            renderItem={({ item }) => (
              <View style={styles.note} key={item}>
                <AppText style={styles.noteText}>{item}</AppText>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      showModal();
                      setSelectedNote(item);
                    }}
                    style={styles.editIcon}
                  >
                    <AntDesign
                      name="edit"
                      size={totalSize(2)}
                      color={colors.dark.textColor}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(item)}
                    style={styles.deleteIcon}
                  >
                    <AntDesign
                      name="delete"
                      size={totalSize(2)}
                      color={colors.dark.textColor}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item}
            ListEmptyComponent={() => (
              <AppText style={styles.notesTitle}>No Notes added yet</AppText>
            )}
            estimatedItemSize={50}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <AppText style={styles.notesTitle}>Edit Note</AppText>
          <AppInput
            placeholder="Edit note"
            value={editedNote.length > 0 ? editedNote : selectedNote}
            onChangeText={(text) => setEditedNote(text)}
            onSubmitEditing={handleSubmitEditing}
            squared
          />
        </Modal>
      </Portal>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
  },
  headerTitle: {
    fontSize: totalSize(2.5),
    fontWeight: "bold",
    color: colors.dark.textColor,
    marginTop: height(2),
    marginBottom: height(1),
  },

  // input
  inputContainer: {
    marginBottom: height(0.3),
  },

  // notes
  notesTitle: {
    fontSize: totalSize(2),
    fontWeight: "bold",
    color: colors.dark.textColor,
    marginBottom: height(1),
  },
  notesContainer: {
    flex: 1,
  },
  note: {
    backgroundColor: colors.dark.secondary,
    paddingHorizontal: width(3),
    paddingVertical: height(2),
    borderRadius: width(2),
    marginBottom: height(1),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  noteText: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: height(1),
  },
  deleteIcon: {
    backgroundColor: colors.dark.topLoserText,
    width: totalSize(3.5),
    height: totalSize(3.5),
    borderRadius: totalSize(3.5),
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    backgroundColor: colors.dark.topGainerText,
    width: totalSize(3.5),
    height: totalSize(3.5),
    borderRadius: totalSize(3.5),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width(2),
  },

  // clear button
  clearButton: {
    backgroundColor: colors.dark.topLoserText,
    width: width(30),
    alignSelf: "flex-start",
    marginBottom: height(1),
  },
});
