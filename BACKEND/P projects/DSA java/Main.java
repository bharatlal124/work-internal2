import java.util.random.*;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.*;

// class Node {
//     int key;
//     Node[] forword;
//     Node(int key, int level){
//         this.key = key;
//         forword = new Node[level + 1];
//     }
// }

// class SkipList{

// }

public class Main {
    public static void main(String[] args) {
        // SkipList list = new SkipList();
        ConcurrentSkipListMap<Integer, String> SkipList = new ConcurrentSkipListMap<>();
        SkipList.put(3, "apple");
        SkipList.put(4, "grapes");
        SkipList.put(5, "banana");
        SkipList.put(9, "pineapple");
        SkipList.put(12, "new");
        SkipList.put(19, "new2");
        // SkipList.add(17);
        // SkipList.add(26);
        // SkipList.add(21);
        // SkipList.add(25);
        System.out.println(SkipList);
    }
}
