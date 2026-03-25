public class arrayinsertion {
    public static void main(String[] args) {
        int arr[] = new int[5];
        int item = 20;
        int len = arr.length;
        System.out.println("Before insertion");
        for(int i = 0; i < 5; i++){
            arr[i] = i+2;
            System.out.println("arr["+i+"] " + arr[i]);
        }
        arr[2] = item;
        System.out.println("After insertion");
        for(int i = 0; i < 5; i++){
            System.out.println("arr["+i+"] " + arr[i]);
        }
    }
}
