using System.Data;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace pobject.API.Middlewares
{
    public class DataTableJsonConverter : JsonConverter<DataTable>
    {
        public override DataTable Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            throw new NotSupportedException($"{typeof(DataTable)} does not support deserialization.");

        }

        public override void Write(Utf8JsonWriter writer, DataTable source, JsonSerializerOptions options = null)
        {
            writer.WriteStartArray();

            foreach (DataRow dr in source.Rows)
            {
                writer.WriteStartObject();
                foreach (DataColumn col in source.Columns)
                {
                    var key = System.Text.Json.JsonNamingPolicy.CamelCase.ConvertName(col.ColumnName.Trim());
                    var valueString = dr[col].ToString();
                    switch (col.DataType.FullName)
                    {
                        case "System.Guid":
                            writer.WriteString(key, valueString);
                            break;
                        case "System.Char":
                        case "System.String":
                            writer.WriteString(key, valueString);
                            break;
                        case "System.Boolean":
                            Boolean.TryParse(valueString, out bool boolValue);
                            writer.WriteBoolean(key, boolValue);
                            break;
                        case "System.DateTime":
                            if (DateTime.TryParse(valueString, out DateTime dateValue))
                            {
                                writer.WriteString(key, dateValue);
                            }
                            else
                            {
                                writer.WriteString(key, "");
                            }
                            break;
                        case "System.TimeSpan":
                            if (DateTime.TryParse(valueString, out DateTime timeSpanValue))
                            {
                                writer.WriteString(key, timeSpanValue.ToString());
                            }
                            else
                            {
                                writer.WriteString(key, "");
                            }
                            break;
                        case "System.Byte":
                        case "System.SByte":
                        case "System.Decimal":
                        case "System.Double":
                        case "System.Single":
                        case "System.Int16":
                        case "System.Int32":
                        case "System.Int64":
                        case "System.UInt16":
                        case "System.UInt32":
                        case "System.UInt64":
                            if (long.TryParse(valueString, out long intValue))
                            {
                                writer.WriteNumber(key, intValue);
                            }
                            else
                            {
                                double.TryParse(valueString, out double doubleValue);
                                writer.WriteNumber(key, doubleValue);
                            }
                            break;
                        default:
                            writer.WriteString(key, valueString);
                            break;
                    }
                }
                writer.WriteEndObject();
            }

            writer.WriteEndArray();
        }
    }
}
