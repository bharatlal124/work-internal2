public class TwoDarray {
    public static void main(String[] args) {
        int[][] matrix = {{2,3,4},
                          {5,6,7}};

        int len = matrix.length;

        for(int i=  0; i < len; i++){
            for(int j = 0; j < matrix[i].length; j++){
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}
