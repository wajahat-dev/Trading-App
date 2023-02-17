using System.Data;

namespace pobject.Core;
public class StoreCode
{
    public bool Success { get; set; }
    public string MessageBox { get; set; }
    public object Information { get; set; }
}

public class StoreCodeDT
{
    public bool GoodResponse { get; set; }
    public string MessageBox { get; set; }
    public DataTable Information { get; set; }
}
