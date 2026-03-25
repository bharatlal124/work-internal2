import java.util.*;

public class hashset {
    public static void main(String[] args) {
        HashSet<Integer> hs = new HashSet();
        hs.add(2);
        hs.add(3);
        hs.add(4);

        System.out.println("Added hashset data : " + hs + "And the size is : " + hs.size());
    }

    // With HashMap
    // public static void main(String[] args) {
    // HashMap<Integer, String> hs = new HashMap<>();
    // hs.put(2, "User1");
    // hs.put(3, "User2");
    // hs.put(4, "User3");

    // System.out.println("Added hashset data : " + hs + "And the size is : " +
    // hs.size());
    // }
}
