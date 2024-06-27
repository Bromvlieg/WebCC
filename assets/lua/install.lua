
local oldPrint = OGPRINT or print
OGPRINT = oldPrint

local ws = nil

print = function(...)
    oldPrint(...)

    if ws then
        local str = ""
        for _, v in pairs({...}) do
            if #str > 0 then str = str .. "    " end
            str = str .. tostring(v)
        end

        ws.send(textutils.serializeJSON({
            cmd = "print",
            data = str
        }))
    end
end

while(true) do
    local host = "ws://aaa.felid.eu:27055/install"

    print("Connecting to WebCC at " .. host)
    ws = http.websocket (host)

    if not ws then
        print("websocket failed :(")
    else
        ws.send(textutils.serializeJSON( {cmd = "boot", data = os.getComputerLabel()} ));
        print("Done!, routing output to websocket, Auwf wiedur snietsel!")

        while(true) do
            print("[WebCC] waiting for next command")
            local msg = ws.receive()
            if (not msg) then
                break
            end

            msg = textutils.unserializeJSON(msg)

            if (msg.cmd == "execute") then
                print("running function")
                local f, err = load(msg.data)
                if not f then
                    print(err)
                else
                    --setfenv(f, {print = print})
                    local suc, err = pcall(f)
                    if not suc then print(err) end
                end
            end

            if (msg.cmd == "install") then
                print("installing function")

                local f, err = load(msg.data)
                if not f then
                    print(err)
                else
                    local fname = "startup";
                    if (fs.exists(fname)) then
                        fs.delete(fname);
                    end

                    local file = fs.open(fname, "w");
                    file.write(msg.data);
                    file.close()
                end
            end
        end
        ws.close()
    end
end
