
function fixSpeed()
    local gear = peripheral.wrap("back")
    local stress = peripheral.wrap("top")

    print(gear.getTargetSpeed(), stress.getStress())

    gear.setTargetSpeed(1)
    gear.setTargetSpeed(1)
    local base = stress.getStress()
    gear.setTargetSpeed(2)
    gear.setTargetSpeed(2)
    local inc = stress.getStress() - base

    local target = (stress.getStressCapacity() - base) / inc
    target = target - 1

    print("base, inc, target: ", base, inc, target)
    gear.setTargetSpeed(target)
end

fixSpeed()

while(true) do
    local gear = peripheral.wrap("back")
    local stress = peripheral.wrap("top")

    if gear and stress then
        if stress.getStress() > stress.getStressCapacity() then
            fixSpeed()
        end
    end

    sleep(1)
end
